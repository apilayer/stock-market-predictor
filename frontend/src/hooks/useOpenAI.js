export async function generateInsights(symbols, series, range, horizon, openaiKey) {
  const all = {};
  symbols.forEach(sym => {
    const arr = series[sym] || [];
    all[sym] = arr.map(p => ({ date: p.date, close: p.close, volume: p.volume }));
  });

  if (Object.keys(all).length === 0 || Object.values(all).every(a => a.length === 0)) {
    throw new Error('No data to analyze. Add symbols and fetch data first.');
  }

  const payload = {
    horizon,
    range,
    symbols,
    series: all
  };

  if (openaiKey) {
    const sys = 'You are a market analyst. Provide concise, neutral, non-promissory insights. Avoid financial advice. Use bullet points when helpful. Keep under 150 words.';
    const user = `Analyze these symbols over ${range} with ${horizon}-term focus. Provide trend, momentum, support/resistance zones if clear, and risks. Data: ${JSON.stringify(payload)}`;
    
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: sys },
          { role: 'user', content: user }
        ],
        temperature: 0.3,
        max_tokens: 300
      })
    });
    
    if (!res.ok) throw new Error('GPT request failed');
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || 'No insight generated.';
  } else {
    // Backend proxy example
    const res = await fetch('/api/gpt-insights', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) throw new Error('Backend insight request failed');
    const data = await res.json();
    return data.insights || 'No insight generated.';
  }
}
