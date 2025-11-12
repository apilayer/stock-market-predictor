import { useEffect, useRef, useState } from 'react';

export default function ChartPanel({ series, symbols, range }) {
  const priceChartRef = useRef(null);
  const volumeChartRef = useRef(null);
  const priceChartInstance = useRef(null);
  const volumeChartInstance = useRef(null);
  const priceChartConfig = useRef(null);
  const volumeChartConfig = useRef(null);
  const [chartsInitialized, setChartsInitialized] = useState(false);
  const priceRenderedRef = useRef(false);
  const volumeRenderedRef = useRef(false);

  useEffect(() => {
    initCharts();
    return () => {
      if (priceChartInstance.current) priceChartInstance.current.dispose();
      if (volumeChartInstance.current) volumeChartInstance.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (chartsInitialized) {
      updateCharts();
    }
  }, [series, symbols, chartsInitialized]);

  function initCharts() {
    if (typeof FusionCharts === 'undefined') {
      console.error('FusionCharts not loaded');
      return;
    }

    // Price Chart (Zoomline)
    if (!priceChartInstance.current) {
      priceChartConfig.current = {
        theme: 'fusion',
        bgColor: '#0a0a0a',
        canvasBgColor: '#0f0f10',
        showLegend: '1',
        legendBgAlpha: '0',
        legendItemFontColor: '#cfcfcf',
        legendItemFont: 'Inter',
        legendItemFontSize: '12',
        showValues: '0',
        drawAnchors: '0',
        paletteColors: '#7c3aed,#22d3ee,#34d399,#f59e0b,#ef4444,#a78bfa',
        plotHighlightEffect: 'fadeout',
        divLineColor: '#2a2a2b',
        vDivLineColor: '#2a2a2b',
        yAxisValueDecimals: '2',
        showCanvasBorder: '0',
        showAlternateVGridColor: '0',
        labelFontColor: '#9a9a9a',
        labelFont: 'Inter',
        labelFontSize: '11',
        yAxisNameFontColor: '#a3a3a3',
        numDivLines: '4',
        formatNumberScale: '0',
        toolTipBgColor: '#0f0f10',
        toolTipColor: '#e5e5e5',
        toolTipBorderColor: '#2a2a2b',
        showToolTipShadow: '0',
        crosslinealpha: '30',
        canvasPadding: '10',
        legendCaption: '',
        caption: ''
      };
      
      priceChartInstance.current = new FusionCharts({
        type: 'zoomline',
        renderAt: 'priceChart',
        width: '100%',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          chart: priceChartConfig.current,
          categories: [{ category: [] }],
          dataset: []
        },
        events: {
          initialized: () => {
            // no-op
          },
          rendered: () => {
            priceRenderedRef.current = true;
            if (priceRenderedRef.current && volumeRenderedRef.current) {
              setChartsInitialized(true);
            }
          },
          renderComplete: () => {
            priceRenderedRef.current = true;
            if (priceRenderedRef.current && volumeRenderedRef.current) {
              setChartsInitialized(true);
            }
          }
        }
      });
      priceChartInstance.current.render();
    }

    // Volume Chart
    if (!volumeChartInstance.current) {
      volumeChartConfig.current = {
        theme: 'fusion',
        bgColor: '#0a0a0a',
        canvasBgColor: '#0f0f10',
        showLegend: '1',
        legendBgAlpha: '0',
        legendItemFontColor: '#cfcfcf',
        legendItemFont: 'Inter',
        legendItemFontSize: '11',
        showValues: '0',
        paletteColors: '#374151,#4b5563,#6b7280,#9ca3af,#d1d5db',
        divLineColor: '#2a2a2b',
        vDivLineColor: '#2a2a2b',
        formatNumberScale: '0',
        labelFontColor: '#9a9a9a',
        labelFont: 'Inter',
        labelFontSize: '11',
        showAlternateVGridColor: '0',
        yAxisValueDecimals: '0',
        showToolTipShadow: '0',
        toolTipBgColor: '#0f0f10',
        toolTipColor: '#e5e5e5',
        toolTipBorderColor: '#2a2a2b',
        showCanvasBorder: '0',
        canvasPadding: '10',
        caption: ''
      };
      
      volumeChartInstance.current = new FusionCharts({
        type: 'mscolumn2d',
        renderAt: 'volumeChart',
        width: '100%',
        height: '180',
        dataFormat: 'json',
        dataSource: {
          chart: volumeChartConfig.current,
          categories: [{ category: [] }],
          dataset: []
        },
        events: {
          initialized: () => {
            // no-op
          },
          rendered: () => {
            volumeRenderedRef.current = true;
            if (priceRenderedRef.current && volumeRenderedRef.current) {
              setChartsInitialized(true);
            }
          },
          renderComplete: () => {
            volumeRenderedRef.current = true;
            if (priceRenderedRef.current && volumeRenderedRef.current) {
              setChartsInitialized(true);
            }
          }
        }
      });
      volumeChartInstance.current.render();
    }
    // chartsInitialized will be set from the 'rendered' events of both charts
  }

  // Fallback: if charts didn't report rendered in time, mark as initialized when both instances exist
  useEffect(() => {
    const t = setTimeout(() => {
      if (!chartsInitialized && priceChartInstance.current && volumeChartInstance.current) {
        setChartsInitialized(true);
      }
    }, 1200);
    return () => clearTimeout(t);
  }, [chartsInitialized]);

  function buildZoomlineData(series) {
    const allDates = new Set();
    Object.values(series).forEach(arr => arr.forEach(p => allDates.add(p.date)));
    const dates = Array.from(allDates).sort((a, b) => new Date(a) - new Date(b));
    const categories = dates.map(d => ({ label: new Date(d).toISOString().slice(0, 10) }));
    const dataset = Object.keys(series).map(sym => {
      const byDate = new Map(series[sym].map(p => [p.date, p.close]));
      return {
        seriesname: sym,
        data: dates.map(d => ({ value: byDate.get(d) ?? '' }))
      };
    });
    return { categories, dataset, dates };
  }

  function buildVolumeData(series, dates) {
    const categories = dates.map(d => ({ label: new Date(d).toISOString().slice(0, 10) }));
    const dataset = Object.keys(series).map(sym => {
      const byDate = new Map(series[sym].map(p => [p.date, p.volume]));
      return { seriesname: sym, data: dates.map(d => ({ value: byDate.get(d) ?? '0' })) };
    });
    return { categories, dataset };
  }

  function updateCharts() {
    // Don't update if charts aren't initialized yet
    if (!chartsInitialized || !priceChartInstance.current || !volumeChartInstance.current ||
        !priceChartConfig.current || !volumeChartConfig.current) {
      return;
    }

    const activeSeries = {};
    symbols.forEach(sym => {
      if (series[sym] && series[sym].length) {
        activeSeries[sym] = series[sym];
      }
    });

    const hasData = Object.keys(activeSeries).length > 0;

    // Don't try to update charts if no data - just return
    if (!hasData) {
      return;
    }

    // Update with data
    try {
      const { categories, dataset, dates } = buildZoomlineData(activeSeries);
      
      // Update or recreate price chart if needed
      if (!priceChartInstance.current || typeof priceChartInstance.current.setJSONData !== 'function') {
        try { priceChartInstance.current?.dispose?.(); } catch {}
        priceChartInstance.current = null;
        priceRenderedRef.current = false;
        setChartsInitialized(false);
        initCharts();
        return;
      }
      priceChartInstance.current.setJSONData({
        chart: priceChartConfig.current,
        categories: [{ category: categories }],
        dataset
      });

      const vol = buildVolumeData(activeSeries, dates);

      if (!volumeChartInstance.current || typeof volumeChartInstance.current.setJSONData !== 'function') {
        try { volumeChartInstance.current?.dispose?.(); } catch {}
        volumeChartInstance.current = null;
        volumeRenderedRef.current = false;
        setChartsInitialized(false);
        initCharts();
        return;
      }
      volumeChartInstance.current.setJSONData({
        chart: volumeChartConfig.current,
        categories: [{ category: vol.categories }],
        dataset: vol.dataset
      });
    } catch (e) {
      console.error('Error updating charts:', e);
      // Dispose and fully re-initialize on any unexpected internal error
      try { priceChartInstance.current?.dispose?.(); } catch {}
      try { volumeChartInstance.current?.dispose?.(); } catch {}
      priceChartInstance.current = null;
      volumeChartInstance.current = null;
      priceRenderedRef.current = false;
      volumeRenderedRef.current = false;
      setChartsInitialized(false);
      setTimeout(() => {
        initCharts();
      }, 0);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-lg bg-neutral-900/40 ring-1 ring-neutral-800">
        <div className="px-3 py-2 flex items-center justify-between border-b border-neutral-800">
          <div className="text-sm font-medium tracking-tight text-neutral-300">Price (Adjusted Close)</div>
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-neutral-800 ring-1 ring-neutral-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 17l6-6 4 4 8-8"></path>
                <path d="M14 7h7v7"></path>
              </svg>
              Zoom & pan enabled
            </span>
          </div>
        </div>
        <div id="priceChart" ref={priceChartRef} className="w-full" style={{ height: '400px' }}></div>
      </div>

      <div className="rounded-lg bg-neutral-900/40 ring-1 ring-neutral-800">
        <div className="px-3 py-2 flex items-center justify-between border-b border-neutral-800">
          <div className="text-sm font-medium tracking-tight text-neutral-300">Volume</div>
          <div className="text-xs text-neutral-500">{symbols.length} symbol(s)</div>
        </div>
        <div id="volumeChart" ref={volumeChartRef} className="w-full" style={{ height: '180px' }}></div>
      </div>
    </div>
  );
}
