import { rangeToDates } from '../utils/helpers';

export async function fetchHistorical(symbols, range) {
  const { from, to } = rangeToDates(range);
  
  // Use backend proxy API
  const url = new URL('/api/eod', window.location.origin);
  url.searchParams.set('symbols', symbols.join(','));
  url.searchParams.set('date_from', from);
  url.searchParams.set('date_to', to);
  url.searchParams.set('limit', '1000');
  url.searchParams.set('sort', 'ASC');

  const res = await fetch(url.toString());
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: 'Unknown error' }));
    throw new Error(error.error || 'Backend API error');
  }
  
  const json = await res.json();
  if (!json || !json.data) throw new Error('No data from backend API');

  // Group by symbol
  const grouped = {};
  json.data.forEach(row => {
    const sym = row.symbol?.toUpperCase();
    if (!sym) return;
    if (!grouped[sym]) grouped[sym] = [];
    grouped[sym].push({
      date: row.date,
      close: Number(row.adj_close ?? row.close),
      volume: Number(row.volume ?? 0),
    });
  });

  // Sort and store
  Object.keys(grouped).forEach(sym => {
    grouped[sym].sort((a, b) => new Date(a.date) - new Date(b.date));
  });

  return grouped;
}
