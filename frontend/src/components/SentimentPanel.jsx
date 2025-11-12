import { useEffect, useState } from 'react';
import { fmtPct } from '../utils/helpers';

export default function SentimentPanel({ symbols, series }) {
  const [breadth, setBreadth] = useState('—');
  const [avgReturn, setAvgReturn] = useState('—');
  const [sentiment, setSentiment] = useState({ label: 'Neutral', className: 'bg-neutral-800 text-neutral-300 ring-neutral-700' });

  useEffect(() => {
    computeSentiment();
  }, [symbols, series]);

  function computeSentiment() {
    const perfs = [];
    symbols.forEach(sym => {
      const arr = series[sym];
      if (!arr || arr.length < 2) return;
      const start = arr[0].close;
      const end = arr[arr.length - 1].close;
      const pct = (end - start) / (start || 1);
      perfs.push(pct);
    });

    if (!perfs.length) {
      setBreadth('—');
      setAvgReturn('—');
      setSentiment({ label: 'Neutral', className: 'bg-neutral-800 text-neutral-300 ring-neutral-700' });
      return;
    }

    const up = perfs.filter(p => p > 0).length;
    const breadthPct = up / perfs.length;
    const avg = perfs.reduce((a, b) => a + b, 0) / perfs.length;

    setBreadth(`${Math.round(breadthPct * 100)}%`);
    setAvgReturn(fmtPct(avg));

    let label = 'Neutral';
    let className = 'bg-neutral-800 text-neutral-300 ring-neutral-700';
    
    if (avg > 0.01 && breadthPct >= 0.6) {
      label = 'Bullish';
      className = 'bg-emerald-900/30 text-emerald-300 ring-emerald-700/50';
    } else if (avg < -0.01 && breadthPct <= 0.4) {
      label = 'Bearish';
      className = 'bg-rose-900/30 text-rose-300 ring-rose-700/50';
    }

    setSentiment({ label, className });
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40">
      <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
        <div className="text-sm font-medium tracking-tight">Market Sentiment</div>
        <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs ring-1 ${sentiment.className}`}>
          {sentiment.label}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-end gap-6">
          <div className="flex-1">
            <div className="text-xs text-neutral-500 mb-1">Breadth (↑ last period)</div>
            <div className="flex items-center gap-2">
              <div className="text-2xl tracking-tight font-semibold">{breadth}</div>
              <div className="text-xs text-neutral-500">of selected symbols</div>
            </div>
          </div>
          <div className="flex-1">
            <div className="text-xs text-neutral-500 mb-1">Avg. return (period)</div>
            <div className="text-2xl tracking-tight font-semibold">{avgReturn}</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-neutral-500">
          Sentiment is calculated from price change over the chosen timeframe across selected symbols.
        </div>
      </div>
    </div>
  );
}
