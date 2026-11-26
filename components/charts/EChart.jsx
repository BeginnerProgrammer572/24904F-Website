"use client";

import { BarChart, LineChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import * as echarts from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { useEffect, useRef, useState } from "react";

echarts.use([BarChart, LineChart, GridComponent, LegendComponent, TooltipComponent, CanvasRenderer]);

export const COLORS = { ink: "#111111", gold: "#756938", muted: "#6b665a", line: "#e4dfd2" };

// One ECharts instance: created on mount, resized with its box, disposed on unmount.
// Screen readers get the written summary in the section instead.
export default function EChart({ option }) {
  const box = useRef(null);
  const chart = useRef(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const instance = echarts.init(box.current);
    chart.current = instance;
    instance.on("finished", () => setDrawn(true));
    const observer = new ResizeObserver(() => instance.resize());
    observer.observe(box.current);
    return () => {
      observer.disconnect();
      instance.dispose();
      chart.current = null;
    };
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    chart.current.setOption(
      {
        animation: !reduced,
        textStyle: { fontFamily: getComputedStyle(document.body).fontFamily, color: COLORS.ink },
        ...option,
      },
      { notMerge: true },
    );
  }, [option]);

  // data-loading lets the loading shader cover the box until the first drawing.
  return <div ref={box} className="chart" aria-hidden="true" data-loading={drawn ? undefined : ""} />;
}
