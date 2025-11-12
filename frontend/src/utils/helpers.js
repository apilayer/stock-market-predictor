export function showToast(msg, toastElement, toastMsgElement) {
  toastMsgElement.textContent = msg;
  toastElement.classList.remove('hidden');
  setTimeout(() => toastElement.classList.add('hidden'), 1800);
}

export function fmtPct(x) {
  const sign = x > 0 ? '+' : '';
  return `${sign}${(x * 100).toFixed(2)}%`;
}

export function dateISO(d) {
  return d.toISOString().split('T')[0];
}

export function rangeToDates(range) {
  const end = new Date();
  const start = new Date();
  
  switch (range) {
    case '1M':
      start.setMonth(end.getMonth() - 1);
      break;
    case '3M':
      start.setMonth(end.getMonth() - 3);
      break;
    case '6M':
      start.setMonth(end.getMonth() - 6);
      break;
    case '1Y':
      start.setFullYear(end.getFullYear() - 1);
      break;
    case '5Y':
      start.setFullYear(end.getFullYear() - 5);
      break;
    case 'YTD':
    default:
      start.setMonth(0);
      start.setDate(1);
      break;
  }
  
  return { from: dateISO(start), to: dateISO(end) };
}
