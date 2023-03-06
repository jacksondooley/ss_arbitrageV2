import requests
import asyncio
import aiohttp
from time import perf_counter


class Phemex:
    def __init__(self):
        self.url = "https://api.phemex.com"
        self.all_linear_markets = []
        self.high_fr_linear_markets = []

        asyncio.run(self.fetch_linear_markets())

    def fetch_markets(self) -> []:
        suffix = "/public/products"
        url = self.url + suffix
        response = requests.get(url)
        markets = response.json()["data"]["products"]
        markets.extend(response.json()["data"]["perpProductsV2"])
        return markets

    async def fetch_market_data(self, session, symbol, market_type):
        if market_type == "PerpetualV2":
            suffix = f"/md/v2/ticker/24hr?symbol={symbol}"
        else:
            suffix = f"/md/ticker/24hr?symbol={symbol}"
        url = self.url + suffix

        async with session.get(url) as response:
            if response.status == 200:
                return (await response.json())["result"]
            # else:
                # print(symbol, response.status)


    async def fetch_linear_markets(self):
        markets = self.fetch_markets()
        tasks = []
        async with aiohttp.ClientSession() as session:
            for market in markets:
                market_type = market["type"]
                if market_type == "Perpetual" or market_type == "PerpetualV2":
                    try:
                        symbol = market["symbol"]
                        task = asyncio.create_task(self.fetch_market_data(session, symbol, market_type))
                        tasks.append(task)
                    except Exception as err:
                        print(f"fetch_linear_markets Error: {err}")
            markets = await asyncio.gather(*tasks)

        self.all_linear_markets = self.cleanse_linear_markets(markets)
        self.high_fr_linear_markets = self.parse_high_fr_linear_markets()
        return self.all_linear_markets

    def cleanse_linear_markets(self, markets):
        linear_markets = {}
        for market in markets:
            if market != None:
                baseCurrency, quoteCurrency = self.split_symbol(market["symbol"])
                if baseCurrency not in linear_markets:
                    linear_markets[baseCurrency] = []

                if "fundingRate" in market.keys():
                    fundingRate = float(market["fundingRate"]) * 0.000001
                    fundingRate = round(fundingRate, 4)
                elif "fundingRateRr" in market.keys():
                    fundingRate = float(market["fundingRateRr"]) * 100
                    fundingRate = round(fundingRate, 4)

                linear_markets[baseCurrency].append({
                    "symbol": market["symbol"],
                    "exchange": "phemex",
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

    def split_symbol(self, symbol: str) -> (str, str):
        if symbol[-3:] == "USD":
            return symbol[:-3], "USD"
        elif symbol[-4:] == "USDT":
            return symbol[:-4], "USDT"