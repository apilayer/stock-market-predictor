# Stock Market Predictor - Frontend

A React application for visualizing stock trends using MarketStack API, FusionCharts, and GPT insights.

## Features

- **Real-time Stock Data**: Fetch historical stock data using MarketStack API
- **Interactive Charts**: Zoom and pan through price and volume charts powered by FusionCharts
- **Multiple Symbols**: Add and compare multiple stock symbols simultaneously
- **Timeframe Selection**: View data across different timeframes (1M, 3M, 6M, 1Y, 5Y, YTD)
- **GPT Insights**: Generate AI-powered market analysis and insights
- **Market Sentiment**: Real-time sentiment calculation based on selected symbols

## Tech Stack

- **React 19** with Vite
- **Tailwind CSS v4** for styling
- **FusionCharts** for data visualization
- **MarketStack API** for stock data
- **OpenAI GPT** for market insights

## Setup

### Backend Setup (Required)

The frontend requires the backend proxy server to be running for fetching stock data.

1. **Navigate to backend folder:**
   ```bash
   cd ../backend
   ```

2. **Follow backend setup instructions** (see backend/README.md):
   - Create virtual environment
   - Install dependencies
   - Configure `.env` with MarketStack API key
   - Start the server: `python app.py`

3. **Verify backend is running:**
   Backend should be accessible at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start the development server:**
   ```bash
   pnpm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## Configuration

### MarketStack API

Stock data is fetched through the **backend proxy server**. The MarketStack API key is configured in the backend's `.env` file, keeping it secure and hidden from the client.

**No frontend configuration needed for stock data!**

### OpenAI API (Optional)

Click the **"Connect APIs"** button in the header to optionally configure:

**OpenAI API Key** (Optional)
- Get your key at [platform.openai.com](https://platform.openai.com)
- Required for client-side GPT-powered insights
- Alternatively, leave empty and implement a backend endpoint at `/api/gpt-insights`
- Stored locally in your browser's localStorage

## Usage

### Adding Symbols
1. Type a stock symbol (e.g., AAPL, MSFT) in the input field
2. Click "Add" or press Enter
3. Or click on suggested symbols for quick access

### Viewing Charts
- **Price Chart**: Interactive zoomline chart with zoom and pan capabilities
- **Volume Chart**: Multi-series column chart showing trading volumes
- Charts automatically update when symbols or timeframes change

### Changing Timeframes
Select from preset timeframes:
- **1M**: Last 1 month
- **3M**: Last 3 months
- **6M**: Last 6 months
- **1Y**: Last 1 year
- **5Y**: Last 5 years
- **YTD**: Year to date

### Generating Insights
1. Select symbols and timeframe
2. Choose horizon (short-term, medium-term, or long-term)
3. Click "Generate" in the GPT Insights panel
4. Wait for AI-generated analysis

### Market Sentiment
Automatically calculated based on:
- Price changes over selected timeframe
- Breadth (percentage of symbols with positive returns)
- Average return across all selected symbols

## Project Structure

```
frontend/
├── public/
│   └── fusioncharts/        # FusionCharts library files
├── src/
│   ├── components/          # React components
│   │   ├── Header.jsx
│   │   ├── ControlPanel.jsx
│   │   ├── ChartPanel.jsx
│   │   ├── InsightsPanel.jsx
│   │   ├── SentimentPanel.jsx
│   │   ├── ApiModal.jsx
│   │   └── Toast.jsx
│   ├── hooks/               # Custom hooks
│   │   ├── useMarketStack.js
│   │   └── useOpenAI.js
│   ├── utils/               # Utility functions
│   │   └── helpers.js
│   ├── App.jsx              # Main app component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── index.html
├── package.json
└── README.md
```

## Build for Production

```bash
pnpm run build
```

The production-ready files will be in the `dist/` directory.

## Architecture

The application uses a **backend proxy pattern**:

```
Frontend (React) → Backend (Flask) → MarketStack API
      ↓
   OpenAI API (optional, direct)
```

**Benefits:**
- MarketStack API key stays secure on the backend
- CORS issues avoided
- Single point for API rate limiting and caching (future enhancement)
- Frontend doesn't expose sensitive credentials

## Notes

- **Backend Required**: The backend server must be running for the app to work
- **Data Delay**: MarketStack free tier may have delayed data
- **Not Financial Advice**: This tool is for demonstration and educational purposes only
- **API Limits**: Be mindful of API rate limits on free tiers
- **Port Configuration**: Frontend proxies `/api/*` requests to `http://localhost:5000`

## Troubleshooting

### Backend not connecting
- Ensure backend server is running on `http://localhost:5000`
- Check backend terminal for errors
- Verify `.env` file exists in backend folder with valid `MARKETSTACK_API_KEY`

### Charts not showing
- Verify FusionCharts scripts are loaded in `index.html`
- Check browser console for errors
- Ensure backend is running and accessible

### No data loading
- Verify backend MarketStack API key is valid (in backend/.env)
- Check backend logs for API errors
- Check API rate limits (free tier: 100 requests/month)
- Ensure stock symbols are valid and available
- Verify backend CORS is enabled

### GPT insights failing
- Verify OpenAI API key is configured
- Check API quota and billing
- Alternatively, implement backend proxy endpoint
