from dateutil import parser
import time
from bybit import bybit_constants as CONSTANTS
import requests


class Bybit:
    def __init__(self):
        self.url = CONSTANTS.REST_URL
        self.all_linear_markets = []
        self.high_fr_linear_markets = []

        self.fetch_linear_markets()


    def fetch_linear_markets(self):
        suffix = "/v5/market/tickers"
        url = self.url + suffix
        params = {"category": "linear"}
        response = requests.get(url, params=params)
        response = response.json()["result"]["list"]
        self.all_linear_markets = self.cleanse_linear_markets(response)
        self.high_fr_linear_markets = self.parse_high_fr_linear_markets()
        return self.all_linear_markets

    def cleanse_linear_markets(self, markets):
        linear_markets = {}
        for market in markets:
            baseCurrency, quoteCurrency = self.split_symbol(market["symbol"])
            if baseCurrency not in linear_markets:
                linear_markets[baseCurrency] = []

            fundingRate = float(market["fundingRate"]) * 100
            fundingRate = round(fundingRate, 4)
            linear_markets[baseCurrency].append({
                "symbol": market["symbol"],
                "exchange": "bybit",
                "baseCurrency": baseCurrency,
                "quoteCurrency": quoteCurrency,
                "fundingRate": fundingRate
            })

        return linear_markets

    def parse_high_fr_linear_markets(self):
        high_fr_linear_markets = []
        for symbol in self.all_linear_markets:
            for market in self.all_linear_markets[symbol]:
                if market["fundingRate"] > 0.1 or market["fundingRate"] < -0.1:
                    high_fr_linear_markets.append(market)

        return high_fr_linear_markets

    def split_symbol(self, symbol: str):
        if symbol[-4:] == "USDT":
            return symbol[:-4], "USDT"
        elif symbol[-4:] == "PERP":
            return symbol[:-4], "USDC"

bybit = Bybit()

msg = bybit.high_fr_linear_markets

print(msg)