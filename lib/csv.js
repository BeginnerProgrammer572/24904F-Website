// Small strict CSV reader. Any problem throws with the file and line, so bad data
// fails the build instead of reaching the site.

function splitLine(line, where) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (quoted) {
      if (c !== '"') cell += c;
      else if (line[i + 1] === '"') cell += line[++i];
      else quoted = false;
    } else if (c === '"' && cell === "") quoted = true;
    else if (c === ",") {
      cells.push(cell.trim());
      cell = "";
    } else cell += c;
  }
  if (quoted) throw new Error(`${where}: a quoted value is never closed`);
  cells.push(cell.trim());
  return cells;
}

export function text(value, name) {
  if (!value) throw new Error(`${name} is empty`);
  return value;
}

export function number(value, name) {
  const n = Number(value);
  if (value === "" || !Number.isFinite(n)) throw new Error(`${name} "${value}" is not a number`);
  return n;
}

export function isoDate(value, name) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(parsed.getTime()) || !parsed.toISOString().startsWith(value)) {
    throw new Error(`${name} "${value}" is not a YYYY-MM-DD date`);
  }
  return value;
}

export const oneOf = (allowed) => (value, name) => {
  if (!allowed.includes(value)) throw new Error(`${name} "${value}" must be one of: ${allowed.join(", ")}`);
  return value;
};

// `columns` maps each header name, in order, to the function that checks it.
export function parseCsv(source, columns, file) {
  const lines = source.replace(/^﻿/, "").split(/\r?\n/);
  const names = Object.keys(columns);
  const header = splitLine(lines[0], `${file} line 1`);
  if (header.join(",") !== names.join(",")) {
    throw new Error(`${file} line 1: the header must be "${names.join(",")}"`);
  }
  return lines.flatMap((line, i) => {
    if (i === 0 || line.trim() === "") return [];
    const where = `${file} line ${i + 1}`;
    const cells = splitLine(line, where);
    if (cells.length !== names.length) throw new Error(`${where}: expected ${names.length} values, found ${cells.length}`);
    try {
      return [Object.fromEntries(names.map((name, n) => [name, columns[name](cells[n], name)]))];
    } catch (error) {
      throw new Error(`${where}: ${error.message}`);
    }
  });
}
