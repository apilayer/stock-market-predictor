# Stock Market Predictor - Backend API Proxy

Flask-based proxy API for Marketstack API to securely handle API requests without exposing your API key in the frontend.

## Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
```

3. Activate the virtual environment:
```bash
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

6. Add your Marketstack API key to the `.env` file:
```
MARKETSTACK_API_KEY=your_actual_api_key_here
```

## Running the Server

Make sure your virtual environment is activated (you should see `(venv)` in your terminal prompt):

```bash
python app.py
```

To deactivate the virtual environment when done:
```bash
deactivate
```

The server will start on `http://localhost:5000`

## Available Endpoints

### Root
- **GET** `/` - API information and available endpoints

### End-of-Day Data
- **GET** `/api/eod?symbols=AAPL&limit=100&sort=DESC`
- Query parameters: `symbols`, `sort`, `date_from`, `date_to`, `limit`, `offset`

### Intraday Data
- **GET** `/api/intraday?symbols=AAPL&interval=1h`
- Query parameters: `symbols`, `interval`, `sort`, `date_from`, `date_to`, `limit`, `offset`

### Tickers
- **GET** `/api/tickers?exchange=NASDAQ&limit=100`
- Query parameters: `exchange`, `limit`, `offset`

### Exchanges
- **GET** `/api/exchanges?limit=100`
- Query parameters: `limit`, `offset`

### Currencies
- **GET** `/api/currencies?limit=100`
- Query parameters: `limit`, `offset`

### Timezones
- **GET** `/api/timezones?limit=100`
- Query parameters: `limit`, `offset`

## Usage Example

From your frontend, instead of calling:
```
http://api.marketstack.com/v1/eod?access_key=YOUR_KEY&symbols=AAPL
```

Call your proxy:
```
http://localhost:5000/api/eod?symbols=AAPL
```

The proxy will automatically add your API key from the `.env` file.

## Security Notes

- Never commit the `.env` file to version control
- The `.gitignore` file is configured to exclude `.env`
- Always use environment variables for sensitive data
