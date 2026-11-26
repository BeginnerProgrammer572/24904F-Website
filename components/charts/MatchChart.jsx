"use client";

import { useMemo } from "react";
import EChart, { COLORS } from "./EChart";

const shortDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const escapeHtml = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export default function MatchChart({ matches }) {
  const option = useMemo(() => {
    const bars = (name, key, color) => ({ name, type: "bar", itemStyle: { color }, data: matches.map((m) => m[key]) });
    return {
      grid: { left: 8, right: 8, top: 40, bottom: 8, containLabel: true },
      legend: { top: 0, left: 0, textStyle: { color: COLORS.ink } },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        // The tooltip is HTML, so text from the CSV is escaped.
        formatter: (items) => {
          const m = matches[items[0].dataIndex];
          return `${escapeHtml(shortDate.format(new Date(m.date)))}, ${escapeHtml(m.event)}<br>${escapeHtml(m.match)}<br>Our score: ${m.ours}<br>Opponent: ${m.theirs}`;
        },
      },
      // Match names repeat between events, so each label carries its date.
      xAxis: { type: "category", data: matches.map((m) => `${m.match}\n${shortDate.format(new Date(m.date))}`), axisLabel: { color: COLORS.muted, hideOverlap: true } },
      yAxis: { type: "value", splitLine: { lineStyle: { color: COLORS.line } } },
      series: [bars("Our score", "ours", COLORS.gold), bars("Opponent", "theirs", COLORS.ink)],
    };
  }, [matches]);

  return <EChart option={option} />;
}
