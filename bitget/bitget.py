# from datetime import parser
from bitget import bitget_constants as CONSTANTS
import requests

class BitGet:
    def __init__(self):
        self.url = CONSTANTS.REST_URL
        self.all_linear_markets = []
        self.high_fr_linear_marekts = []
        self.name = "BitGet"

        self.fetch_linear_markets()

    def fetch_linear_markets(self):
        suffix = "/api/mix/v1/market/contracts"
        url = self.url + suffix
        params = {
            "productType": "umcbl"
        }
        response = requests.get(url, params=params)
        response = response.json()["data"]
        self.cleanse_linear_markets(response)
        # print(response.keys())

    def cleanse_linear_markets(self, markets):
        linear_markets = {}
        for market in markets:
            if market["baseCoin"] not in linear_markets:
                linear_markets[market["baseCoin"]] = []
            linear_markets[market["baseCoin"]].append({
                "symbol": market["symbol"][:-6],
                "exchage": "bitget",
                "baseCurrency": market["baseCoin"],
                "quoteCurrency": market["quoteCoin"],
                "fundingRate": 0
            })
        print(linear_markets)

bitget = BitGet()