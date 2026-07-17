"use client";
import { useEffect, useRef } from "react";

export type ChartData = { candles: number[][]; entry: number; dir: string;
  tp?: number; sl?: number; exit?: number };

export default function TradeHoverChart({ data, symbol }:
  { data: ChartData; symbol: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let chart: { remove: () => void } | null = null;
    let cancelled = false;
    (async () => {
      const LWC = await import("lightweight-charts");
      if (cancelled || !ref.current) return;
      const c = LWC.createChart(ref.current, {
        width: 420, height: 260,
        localization: { locale: "en-GB" },
        layout: { background: { color: "#FFFFFF" }, textColor: "#6B7280",
          fontSize: 11 },
        grid: { vertLines: { color: "#F3F4F6" }, horzLines: { color: "#F3F4F6" } },
        timeScale: { timeVisible: true, secondsVisible: false,
          borderColor: "#E5E7EB" },
        rightPriceScale: { borderColor: "#E5E7EB" },
        handleScroll: false, handleScale: false,
      });
      chart = c;
      const series = c.addSeries(LWC.CandlestickSeries, {
        upColor: "#0E9F6E", downColor: "#E02424",
        wickUpColor: "#0E9F6E", wickDownColor: "#E02424",
        borderVisible: false });
      series.setData(data.candles.map(x => ({
        time: x[0] as never, open: x[1], high: x[2], low: x[3], close: x[4] })));
      series.createPriceLine({ price: data.entry, color: "#B45309",
        lineWidth: 2, lineStyle: 2, title: "ENTRY" });
      if (data.tp) series.createPriceLine({ price: data.tp, color: "#0E9F6E",
        lineWidth: 2, lineStyle: 2, title: "TARGET" });
      if (data.exit) series.createPriceLine({ price: data.exit, color: "#0891B2",
        lineWidth: 2, lineStyle: 0, title: "RUNNER OUT" });
      if (data.sl) series.createPriceLine({ price: data.sl, color: "#E02424",
        lineWidth: 2, lineStyle: 2, title: "STOP" });
      const entryBar = data.candles.reduce((best, x) =>
        Math.abs(x[1] - data.entry) < Math.abs(best[1] - data.entry) ? x : best,
        data.candles[0]);
      LWC.createSeriesMarkers(series, [{
        time: entryBar[0] as never,
        position: data.dir === "long" ? "belowBar" : "aboveBar",
        color: "#B45309",
        shape: data.dir === "long" ? "arrowUp" : "arrowDown",
        text: "ENTRY", size: 2 }]);
      c.timeScale().fitContent();
    })();
    return () => { cancelled = true; if (chart) chart.remove(); };
  }, [data]);
  return (
    <div style={{ position: "absolute", zIndex: 50, right: 0, top: "100%",
      background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12,
      boxShadow: "0 18px 50px rgba(15,23,42,.18)", padding: 10 }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: ".08em",
        color: "#6B7280", marginBottom: 6 }}>{symbol} · H1 · THE TRADE, DRAWN</div>
      <div ref={ref} />
    </div>
  );
}
