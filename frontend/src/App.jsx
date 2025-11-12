import { useState, useEffect } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import ChartPanel from './components/ChartPanel';
import InsightsPanel from './components/InsightsPanel';
import SentimentPanel from './components/SentimentPanel';
import ApiModal from './components/ApiModal';
import Toast from './components/Toast';
import { fetchHistorical } from './hooks/useMarketStack';

function App() {
  const [symbols, setSymbols] = useState(['AAPL']);
  const [range, setRange] = useState('YTD');
  const [series, setSeries] = useState({});
  const [loading, setLoading] = useState(false);
  const [openaiKey, setOpenaiKey] = useState(null);
  const [showApiModal, setShowApiModal] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    loadKeys();
  }, []);

  useEffect(() => {
    if (symbols.length > 0) {
      updateAll(false);
    }
  }, [symbols, range]);

  function loadKeys() {
    setOpenaiKey(localStorage.getItem('OPENAI_KEY') || null);
  }

  function displayToast(msg) {
    setToastMsg(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 1800);
  }

  async function updateAll(force = false) {
    if (loading) return;
    setLoading(true);

    try {
      const grouped = await fetchHistorical(symbols, range);
      const newSeries = {};
      symbols.forEach(sym => {
        newSeries[sym] = grouped[sym] || [];
      });
      setSeries(newSeries);
    } catch (e) {
      console.error(e);
      displayToast(e.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  function addSymbol(symbol) {
    const sym = symbol.trim().toUpperCase();
    if (!sym) return;
    if (!/^[A-Z.\-]{1,10}$/.test(sym)) {
      displayToast('Invalid symbol');
      return;
    }
    if (!symbols.includes(sym)) {
      setSymbols([...symbols, sym]);
    } else {
      displayToast(`${sym} already added`);
    }
  }

  function removeSymbol(symbol) {
    setSymbols(symbols.filter(s => s !== symbol));
    const newSeries = { ...series };
    delete newSeries[symbol];
    setSeries(newSeries);
  }

  return (
    <div className="antialiased bg-neutral-950 text-neutral-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <div className="min-h-screen flex flex-col">
        <Header
          onOpenApiModal={() => setShowApiModal(true)}
          onRefresh={() => updateAll(true)}
          loading={loading}
        />

        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
              <div className="xl:col-span-9">
                <ControlPanel
                  symbols={symbols}
                  range={range}
                  onAddSymbol={addSymbol}
                  onRemoveSymbol={removeSymbol}
                  onRangeChange={setRange}
                />
                <ChartPanel series={series} symbols={symbols} range={range} />
              </div>

              <aside className="xl:col-span-3 flex flex-col gap-6">
                <InsightsPanel
                  symbols={symbols}
                  series={series}
                  range={range}
                  openaiKey={openaiKey}
                  onToast={displayToast}
                />
                <SentimentPanel symbols={symbols} series={series} range={range} />
              </aside>
            </section>

            <div className="mt-8 text-[13px] text-neutral-500 border-t border-neutral-900 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>Data via MarketStack. Charts by FusionCharts. Insights by GPT. Delayed data may apply.</div>
              <div>For demonstration only. Not investment advice.</div>
            </div>
          </div>
        </main>
      </div>

      <ApiModal
        show={showApiModal}
        onClose={() => setShowApiModal(false)}
        onSave={() => {
          loadKeys();
          updateAll(true);
          displayToast('Keys saved');
        }}
        onToast={displayToast}
      />

      <Toast show={showToast} message={toastMsg} />
    </div>
  );
}

export default App;
