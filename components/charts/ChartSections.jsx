import { summariseMatches, summarisePid } from "@/lib/chartData";
import { MatchChart, PidChart } from "./LazyCharts";

function ChartSection({ title, summary, children }) {
  return (
    <section className="blk">
      <h2>{title}</h2>
      <p className="sr-only">{summary}</p>
      <div className="card">{children}</div>
    </section>
  );
}

export function PidSection({ runs }) {
  if (!runs) return null;
  return (
    <ChartSection title="PID response" summary={summarisePid(runs)}>
      <PidChart runs={runs} />
    </ChartSection>
  );
}

export function MatchSection({ matches }) {
  if (!matches) return null;
  return (
    <ChartSection title="Match scores" summary={summariseMatches(matches)}>
      <MatchChart matches={matches} />
    </ChartSection>
  );
}
