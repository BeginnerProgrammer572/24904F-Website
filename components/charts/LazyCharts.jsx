"use client";

import dynamic from "next/dynamic";

// The chart code (and ECharts with it) is fetched only when one of these renders,
// which the pages do only when their CSV has data.
const placeholder = () => <div className="chart" data-loading="" />;

export const PidChart = dynamic(() => import("./PidChart"), { ssr: false, loading: placeholder });
export const MatchChart = dynamic(() => import("./MatchChart"), { ssr: false, loading: placeholder });
