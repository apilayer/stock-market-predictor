import { useState, useEffect } from 'react';

export default function ApiModal({ show, onClose, onSave, onToast }) {
  const [openaiKey, setOpenaiKey] = useState('');

  useEffect(() => {
    if (show) {
      setOpenaiKey(localStorage.getItem('OPENAI_KEY') || '');
    }
  }, [show]);

  function handleSave() {
    if (openaiKey) localStorage.setItem('OPENAI_KEY', openaiKey);
    onSave();
    onClose();
  }

  function handleClear() {
    localStorage.removeItem('OPENAI_KEY');
    setOpenaiKey('');
    onToast('Keys cleared');
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg rounded-xl bg-neutral-950 ring-1 ring-neutral-800 shadow-xl">
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="text-sm font-medium tracking-tight">Connect APIs</div>
          <button
            onClick={onClose}
            className="p-2 rounded-md hover:bg-neutral-900 ring-1 ring-transparent hover:ring-neutral-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5 text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-4 space-y-4">
          <div className="p-3 rounded-md bg-neutral-900/60 border border-neutral-800">
            <div className="flex items-start gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-emerald-400 mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <div className="text-xs text-neutral-300">
                <div className="font-medium mb-1">MarketStack API Configured</div>
                <div className="text-neutral-400">Stock data is fetched through the backend proxy. No client-side API key needed.</div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-neutral-400 mb-1">OpenAI API Key (Optional - for GPT insights)</label>
            <input
              type="password"
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full bg-neutral-900 text-neutral-100 placeholder-neutral-500 rounded-md px-3 py-2 text-sm ring-1 ring-neutral-800 focus:ring-neutral-700 focus:outline-none"
            />
            <div className="text-[11px] text-neutral-500 mt-1">Stored locally in your browser. Leave empty to use backend GPT endpoint.</div>
          </div>
        </div>
        <div className="p-4 border-t border-neutral-800 flex items-center justify-end gap-2">
          <button
            onClick={handleClear}
            className="px-3 py-2 text-xs rounded-md ring-1 ring-neutral-800 hover:ring-neutral-700 bg-neutral-900"
          >
            Clear
          </button>
          <button
            onClick={handleSave}
            className="px-3 py-2 text-xs rounded-md bg-indigo-600 hover:bg-indigo-500 text-white ring-1 ring-indigo-500/30"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
