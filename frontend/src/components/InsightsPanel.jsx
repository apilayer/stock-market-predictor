import { useState } from 'react';
import { generateInsights } from '../hooks/useOpenAI';

export default function InsightsPanel({ symbols, series, range, openaiKey, onToast }) {
  const [horizon, setHorizon] = useState('short');
  const [insights, setInsights] = useState('Select symbols and timeframe, then generate insights. No financial advice.');
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setInsights('Analyzing with GPT…');
    
    try {
      const text = await generateInsights(symbols, series, range, horizon, openaiKey);
      setInsights(text);
    } catch (err) {
      setInsights('Failed to generate insights. Connect API keys or check your backend.');
      onToast(err.message || 'Failed to generate insights');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40">
      <div className="p-3 sm:p-4 border-b border-neutral-800">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3l1.93 3.79L18 9l-4.07 2.21L12 15l-1.93-3.79L6 9l4.07-2.21L12 3z"></path>
              <path d="M5 19l.66-1.31L7 17l-1.34-.69L5 15l-.66 1.31L3 17l1.34.69L5 19z"></path>
              <path d="M19 19l.66-1.31L21 17l-1.34-.69L19 15l-.66 1.31L17 17l1.34.69L19 19z"></path>
            </svg>
            <div className="text-sm font-medium tracking-tight">GPT Insights</div>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={horizon}
              onChange={(e) => setHorizon(e.target.value)}
              className="flex-1 bg-neutral-900 text-neutral-200 text-xs rounded-md px-2 py-1.5 ring-1 ring-neutral-800 focus:outline-none"
            >
              <option value="short">Short-term</option>
              <option value="medium">Medium-term</option>
              <option value="long">Long-term</option>
            </select>
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex shrink-0 items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium tracking-tight bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500/90 text-white ring-1 ring-indigo-500/30 hover:ring-indigo-400/40 disabled:opacity-60 disabled:pointer-events-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3l1.93 3.79L18 9l-4.07 2.21L12 15l-1.93-3.79L6 9l4.07-2.21L12 3z"></path>
                <path d="M5 19l.66-1.31L7 17l-1.34-.69L5 15l-.66 1.31L3 17l1.34.69L5 19z"></path>
                <path d="M19 19l.66-1.31L21 17l-1.34-.69L19 15l-.66 1.31L17 17l1.34.69L19 19z"></path>
              </svg>
              Generate
            </button>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-neutral-300 leading-6 whitespace-pre-wrap">
          {insights}
        </div>
      </div>
    </div>
  );
}
