from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend requests

# Marketstack API configuration
MARKETSTACK_BASE_URL = "http://api.marketstack.com/v1/"
API_KEY = os.getenv("MARKETSTACK_API_KEY")

if not API_KEY:
    raise ValueError("MARKETSTACK_API_KEY not found in environment variables")


def proxy_request(endpoint, params=None):
    """Helper function to proxy requests to Marketstack API"""
    if params is None:
        params = {}
    
    # Add API key to parameters
    params["access_key"] = API_KEY
    
    try:
        response = requests.get(f"{MARKETSTACK_BASE_URL}{endpoint}", params=params)
        return jsonify(response.json()), response.status_code
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500


@app.route("/")
def home():
    return jsonify({
        "message": "Stock Market Predictor API Proxy",
        "endpoints": [
            "/api/eod",
            "/api/intraday",
            "/api/tickers",
            "/api/exchanges",
            "/api/currencies",
            "/api/timezones"
        ]
    })


@app.route("/api/eod", methods=["GET"])
def get_eod_data():
    """End-of-Day Data endpoint"""
    params = {
        "symbols": request.args.get("symbols"),
        "sort": request.args.get("sort"),
        "date_from": request.args.get("date_from"),
        "date_to": request.args.get("date_to"),
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("eod", params)


@app.route("/api/intraday", methods=["GET"])
def get_intraday_data():
    """Intraday Data endpoint"""
    params = {
        "symbols": request.args.get("symbols"),
        "interval": request.args.get("interval"),
        "sort": request.args.get("sort"),
        "date_from": request.args.get("date_from"),
        "date_to": request.args.get("date_to"),
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("intraday", params)


@app.route("/api/tickers", methods=["GET"])
def get_tickers():
    """Tickers endpoint"""
    params = {
        "exchange": request.args.get("exchange"),
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("tickers", params)


@app.route("/api/exchanges", methods=["GET"])
def get_exchanges():
    """Exchanges endpoint"""
    params = {
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("exchanges", params)


@app.route("/api/currencies", methods=["GET"])
def get_currencies():
    """Currencies endpoint"""
    params = {
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("currencies", params)


@app.route("/api/timezones", methods=["GET"])
def get_timezones():
    """Timezones endpoint"""
    params = {
        "limit": request.args.get("limit"),
        "offset": request.args.get("offset")
    }
    # Remove None values
    params = {k: v for k, v in params.items() if v is not None}
    
    return proxy_request("timezones", params)


if __name__ == "__main__":
    app.run(debug=True, port=5000)
