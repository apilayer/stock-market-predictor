import { useState } from 'react';

export default function ControlPanel({ symbols, range, onAddSymbol, onRemoveSymbol, onRangeChange }) {
  const [symbolInput, setSymbolInput] = useState('');
  const suggestions = ['AAPL', 'MSFT', 'NVDA', 'GOOGL', 'TSLA', 'AMZN'];
  const timeframes = ['1M', '3M', '6M', '1Y', '5Y', 'YTD'];

  function handleAdd() {
    if (symbolInput.trim()) {
      onAddSymbol(symbolInput);
      setSymbolInput('');
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      handleAdd();
    }
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 mb-4">
      <div className="p-4 border-b border-neutral-800 flex flex-col md:flex-row md:items-center gap-3 justify-between">
        <div className="flex-1 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={symbolInput}
              onChange={(e) => setSymbolInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a stock symbol (e.g., AAPL) and press Add"
              className="w-full bg-neutral-900 text-neutral-100 placeholder-neutral-500 rounded-md pl-9 pr-28 py-2.5 text-sm ring-1 ring-neutral-800 focus:ring-neutral-700 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500/60"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-neutral-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <div className="absolute inset-y-0 right-0 pr-1.5 flex items-center gap-1">
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium tracking-tight bg-neutral-800 hover:bg-neutral-700 active:bg-neutral-700/90 ring-1 ring-neutral-700 hover:ring-neutral-600 text-neutral-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Add
              </button>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <div className="text-xs text-neutral-500">Suggestions:</div>
            <div className="flex flex-wrap gap-1.5">
              {suggestions.map((sym) => (
                <button
                  key={sym}
                  onClick={() => {
                    setSymbolInput(sym);
                    onAddSymbol(sym);
                  }}
                  className="px-2 py-1 rounded-md text-xs font-medium bg-neutral-800 hover:bg-neutral-700 ring-1 ring-neutral-700 text-neutral-200"
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="inline-flex p-0.5 rounded-lg bg-neutral-900 ring-1 ring-neutral-800">
            {timeframes.map((tf) => (
              <button
                key={tf}
                onClick={() => onRangeChange(tf)}
                className={`px-2.5 py-1.5 rounded-md text-xs font-medium tracking-tight ${
                  range === tf
                    ? 'text-white bg-neutral-800'
                    : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Selected symbols */}
      <div className="px-4 py-3 border-b border-neutral-800">
        <div className="flex flex-wrap gap-2">
          {symbols.map((sym) => (
            <div
              key={sym}
              className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-neutral-900 ring-1 ring-neutral-800"
            >
              <span className="text-xs font-medium tracking-tight">{sym}</span>
              <button
                onClick={() => onRemoveSymbol(sym)}
                className="p-1 rounded hover:bg-neutral-800 text-neutral-400"
                aria-label="Remove"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
