"use client";

import { useMemo, useState } from "react";
import EChart, { COLORS } from "./EChart";

const LABELS = { before: "Before tuning", after: "After tuning" };

export default function PidChart({ runs }) {
  const [selected, setSelected] = useState(runs.at(-1).run);
  const option = useMemo(() => {
    const { points } = runs.find((r) => r.run === selected);
    const series = (name, key, color, type) => ({
      name,
      type: "line",
      showSymbol: false,
      lineStyle: { color, width: 2, type },
      itemStyle: { color },
      data: points.map((p) => [p.time, p[key]]),
    });
    return {
      grid: { left: 8, right: 16, top: 40, bottom: 36, containLabel: true },
      legend: { top: 0, left: 0, textStyle: { color: COLORS.ink } },
      tooltip: { trigger: "axis", valueFormatter: (v) => `${v}°` },
      xAxis: { type: "value", name: "Time (ms)", nameLocation: "middle", nameGap: 28, splitLine: { show: false } },
      yAxis: { type: "value", axisLabel: { formatter: "{value}°" }, splitLine: { lineStyle: { color: COLORS.line } } },
      // Dashed target and solid reading, so they differ by more than colour.
      series: [series("Target", "target", COLORS.ink, "dashed"), series("Actual", "actual", COLORS.gold, "solid")],
    };
  }, [runs, selected]);

  return (
    <>
      {runs.length > 1 && (
        <div className="mb-3" role="group" aria-label="Tuning run">
          {runs.map(({ run }) => (
            <button
              key={run}
              type="button"
              className={`btn${selected === run ? "" : " alt"}`}
              aria-pressed={selected === run}
              onClick={() => setSelected(run)}
            >
              {LABELS[run]}
            </button>
          ))}
        </div>
      )}
      <EChart option={option} />
    </>
  );
}
