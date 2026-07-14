"use client";

import { useEffect, useRef } from "react";

type Candle = { time: string; open: number; high: number; low: number; close: number };
type Zone = { level: number; side: string; touches: number; label: string };

const TEAL = "#1AAF8B", RED = "#E8476A", GOLD = "#D4A017";

function Panel({ title, candles, zones, daily }: {
  title: string; candles: Candle[]; zones: Zone[]; daily: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: import("lightweight-charts").IChartApi | null = null;
    let cancelled = false;
    (async () => {
      const lw = await import("lightweight-charts");
      if (cancelled || !ref.current) return;
      chart = lw.createChart(ref.current, {
        width: ref.current.clientWidth || 600,
        height: 380,
        localization: { locale: "en-GB" },
        layout: { background: { color: "#ffffff" }, textColor: "#64748B",
                  fontFamily: "Inter, sans-serif", fontSize: 11 },
        grid: { vertLines: { color: "#F1F5F9" }, horzLines: { color: "#F1F5F9" } },
        rightPriceScale: { borderColor: "#E2E8F0" },
        timeScale: { borderColor: "#E2E8F0",
                     timeVisible: !daily, secondsVisible: false },
        crosshair: { mode: 0 },
      });
      const series = chart.addSeries(lw.CandlestickSeries, {
        upColor: TEAL, downColor: RED, borderUpColor: TEAL, borderDownColor: RED,
        wickUpColor: TEAL, wickDownColor: RED,
      });
      series.setData(candles.map((c) => ({
        time: daily ? c.time
          : (Math.floor(new Date(c.time.replace(" ", "T") + "Z").getTime() / 1000) as import("lightweight-charts").UTCTimestamp),
        open: c.open, high: c.high, low: c.low, close: c.close,
      })));
      for (const z of zones) {
        series.createPriceLine({
          price: z.level,
          color: z.side === "resistance" ? RED : TEAL,
          lineWidth: 2,
          lineStyle: z.touches >= 3 ? 0 : 2,
          axisLabelVisible: true,
          title: z.label,
        });
      }
      chart.timeScale().fitContent();
      const ro = new ResizeObserver(() => {
        if (ref.current && chart) chart.applyOptions({ width: ref.current.clientWidth });
      });
      ro.observe(ref.current);
    })();
    return () => { cancelled = true; chart?.remove(); };
  }, [candles, zones, daily]);

  return (
    <div className="inst-chart-card">
      <div className="jr-card-title">{title}</div>
      <div ref={ref} style={{ width: "100%" }} />
      <div style={{ padding: "10px 2px 6px" }}>
        <span className="inst-zone-tag"><span className="inst-zone-dot" style={{ background: TEAL }} /> support zone</span>
        <span className="inst-zone-tag"><span className="inst-zone-dot" style={{ background: RED }} /> resistance zone</span>
        <span className="inst-zone-tag"><span className="inst-zone-dot" style={{ background: GOLD, opacity: 0 }} /></span>
      </div>
    </div>
  );
}

export default function InstrumentCharts({ d1, h1, zones }: {
  d1: Candle[]; h1: Candle[]; zones: Zone[];
}) {
  return (
    <div className="inst-charts">
      <Panel title="Daily — the structure" candles={d1} zones={zones} daily />
      {h1.length > 0 && <Panel title="Hourly — the intraday read" candles={h1} zones={zones} daily={false} />}
    </div>
  );
}
