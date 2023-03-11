import requests

class Kucoin:
    def __init__(self):
        self.url = "https://api-futures.kucoin.com"
        self.all_linear_markets = []
        self.high_fr_linear_markets = []
        
        self.fetch_linear_markets()

    def fetch_linear_markets(self):
        suffix = "/api/v1/contracts/active"
        url = self.url + suffix
        response = requests.get(url)
        response = response.json()["data"]
        self.all_linear_markets = self.cleanse_linear_markets(response)
        self.high_fr_linear_markets = self.parse_high_fr_linear_markets()
        return self.all_linear_markets

    def cleanse_linear_markets(self, markets):
        linear_markets = {}
        for market in markets:
            if market["quoteCurrency"] == "USDT":
                baseCurrency = market["baseCurrency"]
                if baseCurrency not in linear_markets:
                    linear_markets[baseCurrency] = []

                fundingRate = float(market["fundingFeeRate"]) * 100
                fundingRate = round(fundingRate, 4)
                linear_markets[baseCurrency].append({
                    "symbol": market["symbol"],
                    "exchange": "kucoin",
                    "baseCurrency": baseCurrency,
                    "quoteCurrency": market["quoteCurrency"],
                    "fundingRate": fundingRate 
                })

        return linear_markets

    def parse_high_fr_linear_markets(self):
        high_fr_linear_markets = {}
        for symbol in self.all_linear_markets:
            for market in self.all_linear_markets[symbol]:
                if market["fundingRate"] > 0.1 or market["fundingRate"] < -0.1:
                    baseCurrency = market["baseCurrency"]
                    if baseCurrency not in high_fr_linear_markets:
                        high_fr_linear_markets[baseCurrency] = []
                    
                    high_fr_linear_markets[baseCurrency].append(market)

        return high_fr_linear_markets
