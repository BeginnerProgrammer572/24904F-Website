// Loading shader. This function is turned into a string and inlined in <head>
// (see app/layout.js), so it runs before React and must not use anything from
// outside its own body.
//
// One canvas covers the page and paints only over elements that are still
// loading. It never changes the content, so if it fails, the page just shows.
export function loadingFx() {
  const TARGETS =
    "img, h1, h2, h3, p, .chip, .card, .scard, .awards li, .tl li, .cal li, .spec, " +
    ".brand, .links > a, .dd > a, .seasons-in a, .btn, .footer span, [data-loading]";
  // Things drawn on top of the header photo.
  const IN_FRONT = ".hero-in h1, .hero-in .sub, .hero-in .chip, .brand, .links > a, .dd > a, .seasons-in a";
  const MAX_MS = 2000; // no effect lasts longer than this
  const FADE_MS = 150;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const state = new WeakMap(); // element -> { since, readyAt }
  const waiting = new Set();
  let fontsReady = false;
  let disabled = false;
  let frame = 0;
  let gl = null;
  let canvas = null;
  let uniforms = null;

  const VERT = "attribute vec2 p; void main() { gl_Position = vec4(p, 0.0, 1.0); }";
  // Flat diagonal bands: a base tone with a narrower gold stripe. No glow.
  const FRAG = [
    "precision mediump float;",
    "uniform float time; uniform float light; uniform float alpha;",
    "void main() {",
    "  float x = fract((gl_FragCoord.x - gl_FragCoord.y) / 220.0 - time);",
    "  vec3 black = vec3(0.055); vec3 paper = vec3(0.980, 0.973, 0.953); vec3 gold = vec3(0.698, 0.639, 0.443);",
    "  vec3 base = mix(black, paper, light);",
    "  float band = smoothstep(0.0, 0.15, x) * (1.0 - smoothstep(0.25, 0.45, x));",
    "  gl_FragColor = vec4(mix(base, gold, band * 0.55) * alpha, alpha);",
    "}",
  ].join("\n");

  function release() {
    cancelAnimationFrame(frame);
    frame = 0;
    if (!canvas) return;
    canvas.removeEventListener("webglcontextlost", fail);
    const lose = gl && gl.getExtension("WEBGL_lose_context");
    if (lose) lose.loseContext();
    canvas.remove();
    gl = canvas = uniforms = null;
  }

  function fail() {
    disabled = true;
    release();
    waiting.clear();
  }

  function create() {
    canvas = document.createElement("canvas");
    canvas.setAttribute("aria-hidden", "true");
    canvas.setAttribute("data-loading-canvas", "");
    canvas.style.cssText = "position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:150";
    gl = canvas.getContext("webgl", { antialias: false });
    if (!gl) return false;
    const program = gl.createProgram();
    for (const [type, source] of [[gl.VERTEX_SHADER, VERT], [gl.FRAGMENT_SHADER, FRAG]]) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return false;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const p = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(p);
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
    uniforms = {
      time: gl.getUniformLocation(program, "time"),
      light: gl.getUniformLocation(program, "light"),
      alpha: gl.getUniformLocation(program, "alpha"),
    };
    canvas.addEventListener("webglcontextlost", fail);
    document.documentElement.appendChild(canvas);
    return true;
  }

  const isReady = (el) => {
    const images = el.tagName === "IMG" ? [el] : [...el.querySelectorAll("img")];
    if (images.some((img) => !img.complete)) return false;
    if (el.tagName === "IMG") return true;
    return fontsReady && !el.hasAttribute("data-loading");
  };

  // The part of the element that is actually on screen, or null.
  const visibleRect = (el) => {
    if (el.checkVisibility && !el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })) return null;
    const r = el.getBoundingClientRect();
    let left = Math.max(r.left, 0);
    let right = Math.min(r.right, innerWidth);
    const top = Math.max(r.top, 0);
    let bottom = Math.min(r.bottom, innerHeight);
    const clip = el.closest(".car-track, .logo-band, .links, .seasons-in");
    if (clip) {
      const c = clip.getBoundingClientRect();
      left = Math.max(left, c.left);
      right = Math.min(right, c.right);
    }
    // The content sheet slides over the sticky header.
    const sheet = document.querySelector(".sheet");
    if (sheet && el.closest(".hero")) bottom = Math.min(bottom, sheet.getBoundingClientRect().top);
    return right - left > 1 && bottom - top > 1 ? { left, top, right, bottom } : null;
  };

  function tick(now) {
    frame = 0;
    const paint = [];
    for (const el of waiting) {
      if (!el.isConnected) {
        waiting.delete(el);
        continue;
      }
      const s = state.get(el);
      const ready = isReady(el);
      // Never shown and already loaded: nothing to cover.
      if (ready && s.since === null) {
        waiting.delete(el);
        continue;
      }
      const rect = visibleRect(el);
      if (s.since === null) {
        if (!rect) continue; // off screen: its 2 seconds have not started
        s.since = now;
      }
      if (s.readyAt === null && (ready || now - s.since >= MAX_MS - FADE_MS)) s.readyAt = now;
      const alpha = s.readyAt === null ? 1 : 1 - (now - s.readyAt) / FADE_MS;
      if (alpha <= 0) {
        waiting.delete(el);
        continue;
      }
      if (rect) paint.push({ el, rect, alpha });
    }

    // Off-screen leftovers wait for a scroll; nothing to draw means no canvas.
    if (!paint.length) {
      release();
      return;
    }
    if (!canvas && !create()) {
      fail();
      return;
    }
    if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.disable(gl.SCISSOR_TEST);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);
    gl.uniform1f(uniforms.time, reduced.matches ? 0 : (now / 1200) % 1);
    const scissor = (rect) => {
      const x = Math.floor(rect.left);
      const y = Math.floor(canvas.height - rect.bottom);
      gl.scissor(x, y, Math.ceil(rect.right) - x, Math.ceil(canvas.height - rect.top) - y);
    };
    const draw = ({ el, rect, alpha }) => {
      scissor(rect);
      gl.uniform1f(uniforms.light, el.closest(".sheet") ? 1 : 0);
      gl.uniform1f(uniforms.alpha, alpha);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    // The header photo sits behind its title and the nav: draw it first, then cut
    // those out so that whatever is already ready shows straight away.
    const backdrop = paint.filter((item) => item.el.closest(".hero-img"));
    backdrop.forEach(draw);
    if (backdrop.length) {
      for (const el of document.querySelectorAll(IN_FRONT)) {
        const rect = visibleRect(el);
        if (!rect) continue;
        scissor(rect);
        gl.clear(gl.COLOR_BUFFER_BIT);
      }
    }
    // Everything else still loading, with the nav last because it is on top.
    paint
      .filter((item) => !backdrop.includes(item))
      .sort((a, b) => Number(!!a.el.closest(".nav")) - Number(!!b.el.closest(".nav")))
      .forEach(draw);
    schedule();
  }

  function schedule() {
    if (!frame && !disabled && waiting.size) {
      frame = requestAnimationFrame((now) => {
        try {
          tick(now);
        } catch {
          fail();
        }
      });
    }
  }

  function add(node) {
    if (node.nodeType !== 1 || disabled) return;
    const found = node.matches(TARGETS) ? [node] : [];
    for (const el of [...found, ...node.querySelectorAll(TARGETS)]) {
      if (state.has(el)) continue;
      state.set(el, { since: null, readyAt: null });
      waiting.add(el);
    }
  }

  if (!window.WebGLRenderingContext || !window.MutationObserver) return;

  new MutationObserver((changes) => {
    for (const change of changes) {
      if (change.type === "childList") change.addedNodes.forEach(add);
      else if (change.target.tagName === "IMG") {
        // A new source on the same element loads again.
        state.delete(change.target);
        add(change.target);
      }
    }
    schedule();
  }).observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ["src"] });

  const onFontsReady = () => {
    fontsReady = true;
    schedule();
  };
  const waitForFonts = () => (document.fonts ? document.fonts.ready.then(onFontsReady) : onFontsReady());
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", waitForFonts);
  else waitForFonts();
  setTimeout(onFontsReady, MAX_MS);

  addEventListener("scroll", schedule, { passive: true, capture: true });
  addEventListener("resize", schedule, { passive: true });
  add(document.documentElement);
  schedule();
}
