// Build-time only: reads the chart CSVs. Each loader returns null when there is no
// data, and the page then leaves the chart out altogether.
import { readFileSync } from "node:fs";
import path from "node:path";
import { seasons } from "@/content/seasons";
import { isoDate, number, oneOf, parseCsv, text } from "./csv";

export const RUNS = ["before", "after"];

function read(file, columns) {
  const source = readFileSync(path.join(process.cwd(), file), "utf8");
  return parseCsv(source, columns, file);
}

export function loadPidRuns(file = "content/data/pid-runs.csv") {
  const rows = read(file, { run: oneOf(RUNS), time_ms: number, target_deg: number, actual_deg: number });
  if (rows.length === 0) return null;
  return RUNS.map((run) => ({
    run,
    points: rows
      .filter((r) => r.run === run)
      .map((r) => ({ time: r.time_ms, target: r.target_deg, actual: r.actual_deg }))
      .sort((a, b) => a.time - b.time),
  })).filter((r) => r.points.length > 0);
}

export function loadMatches(season, file = "content/data/matches.csv") {
  const rows = read(file, {
    season: oneOf(seasons.map((s) => s.id)),
    date: isoDate,
    event: text,
    match: text,
    our_score: number,
    opponent_score: number,
  });
  const matches = rows
    .filter((r) => r.season === season)
    .map((r) => ({ date: r.date, event: r.event, match: r.match, ours: r.our_score, theirs: r.opponent_score }))
    // Stable sort: matches on the same day keep the order of the file.
    .sort((a, b) => a.date.localeCompare(b.date));
  return matches.length ? matches : null;
}

// Plain-language summaries for screen readers, built only from the data.
export function summarisePid(runs) {
  return runs
    .map(({ run, points }) => {
      const last = points.at(-1);
      return `${run === "before" ? "Before" : "After"} tuning: target ${last.target} degrees, final reading ${last.actual} degrees after ${last.time} milliseconds.`;
    })
    .join(" ");
}

export function summariseMatches(matches) {
  const count = (test) => matches.filter(test).length;
  const ours = matches.map((m) => m.ours);
  return `${matches.length} matches: ${count((m) => m.ours > m.theirs)} won, ${count((m) => m.ours < m.theirs)} lost, ${count((m) => m.ours === m.theirs)} tied. Our scores ranged from ${Math.min(...ours)} to ${Math.max(...ours)}.`;
}
