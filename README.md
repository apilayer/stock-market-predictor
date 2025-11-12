# Stock Market Predictor

A full-stack application for visualizing and analyzing stock market trends using MarketStack API, FusionCharts, and GPT insights.

## Architecture

```
┌─────────────┐      ┌──────────────┐      ┌──────────────────┐
│   Frontend  │ ───▶ │   Backend    │ ───▶ │ MarketStack API  │
│   (React)   │      │   (Flask)    │      │                  │
└─────────────┘      └──────────────┘      └──────────────────┘
       │
       └──────────────▶ OpenAI API (optional)
```

## Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure API key
cp .env.example .env
# Edit .env and add your MARKETSTACK_API_KEY

# Start server
python app.py
```

Backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Frontend will run on `http://localhost:5173`

## Features

- **Real-time Stock Data**: Historical stock prices via MarketStack API
- **Interactive Charts**: Zoom and pan through FusionCharts visualizations
- **Multiple Symbols**: Compare multiple stocks simultaneously
- **Timeframe Selection**: 1M, 3M, 6M, 1Y, 5Y, YTD
- **GPT Insights**: AI-powered market analysis and predictions
- **Market Sentiment**: Real-time sentiment indicators
- **Secure Architecture**: API keys protected in backend

## Tech Stack

### Frontend
- React 19 + Vite
- Tailwind CSS v4
- FusionCharts
- Modern React Hooks

### Backend
- Flask (Python)
- Flask-CORS
- MarketStack API proxy
- Environment-based configuration

## Usage

1. **Start both backend and frontend servers** (see Quick Start above)
2. **Open** `http://localhost:5173` in your browser
3. **Add stock symbols** (e.g., AAPL, MSFT, GOOGL)
4. **Select timeframe** and view interactive charts
5. **Generate insights** (optional - requires OpenAI API key)

## Configuration

### Required
- **MarketStack API Key**: Configure in `backend/.env`
  - Get free key at [marketstack.com](https://marketstack.com)
  - 100 requests/month on free tier

### Optional
- **OpenAI API Key**: Configure via frontend UI
  - Get key at [platform.openai.com](https://platform.openai.com)
  - Required for GPT insights feature

## Project Structure

```
StockMarketPredictor/
├── backend/              # Flask API proxy server
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   ├── .env.example     # Environment template
│   └── README.md        # Backend documentation
├── frontend/            # React application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   ├── utils/       # Helper functions
│   │   └── App.jsx      # Main app component
│   ├── public/
│   │   └── fusioncharts/ # Chart library
│   └── README.md        # Frontend documentation
└── _assets/             # Design files and resources
```

## Development

### Backend
```bash
cd backend
source venv/bin/activate
python app.py  # Runs on port 5000
```

### Frontend
```bash
cd frontend
pnpm run dev  # Runs on port 5173
```

The frontend is configured to proxy `/api/*` requests to the backend at `http://localhost:5000`.

## Security Notes

- ✅ API keys stored securely in backend `.env` file
- ✅ Keys never exposed to frontend code
- ✅ CORS properly configured
- ✅ Backend acts as secure proxy
- ⚠️ `.env` file is gitignored (never commit secrets)

## Troubleshooting

### Backend issues
- Verify Python 3.x is installed
- Check `.env` file exists with valid `MARKETSTACK_API_KEY`
- Ensure virtual environment is activated
- Check port 5000 is available

### Frontend issues
- Verify backend is running on port 5000
- Check browser console for errors
- Ensure Node.js 18+ is installed
- Clear browser cache if needed

### Data issues
- Verify valid stock symbols (e.g., AAPL, not Apple)
- Check MarketStack API quota (100 requests/month free tier)
- Ensure date ranges are valid

## License

For demonstration and educational purposes only. Not financial advice.

## Credits

- **MarketStack** - Stock market data API
- **FusionCharts** - Interactive data visualization
- **OpenAI** - GPT-powered insights
