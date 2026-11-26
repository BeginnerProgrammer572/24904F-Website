import { notFound } from "next/navigation";
import { MatchSection, PidSection } from "@/components/charts/ChartSections";
import Page from "@/components/layout/Page";
import { loadMatches, loadPidRuns } from "@/lib/chartData";

export const metadata = { title: "Chart preview", robots: { index: false } };

// Development only: shows the charts with the made-up sample data from tests.
export default function ChartPreview() {
  if (process.env.NODE_ENV === "production") notFound();
  return (
    <Page hero={{ title: "Chart preview", sub: "Sample data for development. Not real results." }}>
      <PidSection runs={loadPidRuns("tests/fixtures/pid-runs.csv")} />
      <MatchSection matches={loadMatches("26-27", "tests/fixtures/matches.csv")} />
    </Page>
  );
}
