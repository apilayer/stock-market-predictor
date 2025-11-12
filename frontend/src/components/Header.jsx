export default function Header({ onOpenApiModal, onRefresh, loading }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70 bg-neutral-950/80 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md bg-neutral-800 ring-1 ring-neutral-700 flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-tight">MSG</span>
          </div>
          <div className="hidden sm:flex flex-col leading-tight">
            <span className="text-[15px] font-semibold tracking-tight">MarketStack • FusionCharts • GPT</span>
            <span className="text-xs text-neutral-400">Visualize trends, compare symbols, get natural-language insights</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRefresh}
            disabled={loading}
            className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium tracking-tight bg-neutral-900 hover:bg-neutral-800 active:bg-neutral-800/80 ring-1 ring-neutral-800 hover:ring-neutral-700 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500/60 ${loading ? 'opacity-60 pointer-events-none' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 -ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9"></path>
              <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.49 3.84"></path>
              <path d="M21 3v6h-6"></path>
            </svg>
            Refresh
          </button>
          <button
            onClick={onOpenApiModal}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium tracking-tight bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-500/90 text-white shadow-sm ring-1 ring-indigo-500/30 hover:ring-indigo-400/40 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500/60"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 -ml-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06c.48.48 1.15.62 1.82.33H8a1.65 1.65 0 0 0 1-1.51V2a2 2 0 0 1 4 0v.09c0 .65.39 1.24 1 1.51.67.29 1.34.15 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V8c0 .65.39 1.24 1 1.51.3.13.63.2.97.2H22a2 2 0 0 1 0 4h-.09c-.65 0-1.24.39-1.51 1Z"></path>
            </svg>
            Connect APIs
          </button>
        </div>
      </div>
    </header>
  );
}
