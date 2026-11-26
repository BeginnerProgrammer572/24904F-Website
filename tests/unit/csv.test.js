import { describe, expect, it } from "vitest";
import { seasons } from "@/content/seasons";
import { loadMatches, loadPidRuns, summariseMatches, summarisePid } from "@/lib/chartData";
import { isoDate, number, parseCsv, text } from "@/lib/csv";

const columns = { date: isoDate, event: text, score: number };
const parse = (body) => parseCsv(`date,event,score\n${body}`, columns, "x.csv");

describe("parseCsv", () => {
  it("reads quoted values, CRLF, a BOM and blank lines", () => {
    const rows = parseCsv('﻿date,event,score\r\n2026-01-02,"A, ""B""",5\r\n\r\n', columns, "x.csv");
    expect(rows).toEqual([{ date: "2026-01-02", event: 'A, "B"', score: 5 }]);
  });

  it.each([
    ["2026-01-02,A", /x\.csv line 2: expected 3 values, found 2/],
    ["2026-01-02,A,ten", /line 2: score "ten" is not a number/],
    ["2026-01-02,A,", /line 2: score "" is not a number/],
    ["2026-02-30,A,1", /not a YYYY-MM-DD date/],
    ["1/2/2026,A,1", /not a YYYY-MM-DD date/],
    ["2026-01-02,,1", /event is empty/],
    ['2026-01-02,"A,1', /never closed/],
  ])("rejects %s", (row, message) => {
    expect(() => parse(row)).toThrow(message);
  });

  it("rejects a wrong header", () => {
    expect(() => parseCsv("date,score\n", columns, "x.csv")).toThrow(/line 1: the header must be/);
  });
});

describe("chart data", () => {
  it("is empty for the real files, so no chart shows", () => {
    expect(loadPidRuns()).toBeNull();
    for (const s of seasons) expect(loadMatches(s.id)).toBeNull();
  });

  it("groups PID rows by run", () => {
    const runs = loadPidRuns("tests/fixtures/pid-runs.csv");
    expect(runs.map((r) => [r.run, r.points.length])).toEqual([["before", 9], ["after", 9]]);
    expect(summarisePid(runs)).toContain("After tuning: target 90 degrees, final reading 90 degrees after 800 milliseconds.");
  });

  it("filters and orders matches by season", () => {
    const matches = loadMatches("26-27", "tests/fixtures/matches.csv");
    expect(matches.map((m) => m.match)).toEqual(["Q1", "Q2", "Q1", "Q2"]);
    expect(matches[0].event).toBe("Sample Event, A");
    expect(summariseMatches(matches)).toBe("4 matches: 2 won, 1 lost, 1 tied. Our scores ranged from 25 to 60.");
  });
});
