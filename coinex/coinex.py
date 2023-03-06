import requests
import asyncio
import aiohttp

class Coinex:
    def __init__(self):
        self.url = "https://api.coinex.com"
        self.all_linear_markets = []
        self.high_fr_linear_markets = []

        asyncio.run(self.fetch_linear_markets())


    def fetch_markets(self):
        suffix = "/perpetual/v1/market/list"
        url = self.url + suffix
        response = requests.get(url)
        return response.json()["data"]

    async def fetch_linear_markets(self):
        markets = self.fetch_markets()
        tasks = []
        async with aiohttp.ClientSession() as session:
            for market in markets:
                if market["type"] == 1: # 1: linear_market
                    try:
                        task = asyncio.create_task(self.fetch_market_data(session, market["name"]))
                        tasks.append(task)
                    except Exception as err:
                        print(f"{err}")
            markets = await asyncio.gather(*tasks)
        
        self.all_linear_markets = self.cleanse_linear_markets(markets)
        self.high_fr_linear_markets = self.parse_high_fr_linear_markets()
        return self.all_linear_markets
                         
    async def fetch_market_data(self, session, market_name):
        suffix = f"/perpetual/v1/market/ticker?market={market_name}"
        url = self.url + suffix

        async with session.get(url) as response:
            if response.status == 200:
                response = (await response.json())["data"]["ticker"]
                response["baseCurrency"] = market_name[:-4]
                response["quoteCurrency"] = market_name[-4:]
                return response
            else:
                print(market_name, response.status)

    def cleanse_linear_markets(self, markets):
        linear_markets = {}
        for market in markets:
            baseCurrency = market["baseCurrency"]
            if baseCurrency not in linear_markets:
                linear_markets[baseCurrency] = []

            fundingRate = float(market["funding_rate_next"]) * 100
            fundingRate = round(fundingRate, 4)
            linear_markets[baseCurrency].append({
                "symbol": baseCurrency + market["quoteCurrency"],
                "exchange": "coinex",
                "baseCurrency": baseCurrency,
                "quoteCurrency": market["quoteCurrency"],
                "fundingRate": fundingRate
            })
        
        return linear_markets

    def parse_high_fr_linear_markets(self):
        high_fr_linear_markets = []
        markets = self.all_linear_markets
        for symbol in markets:
            for market in markets[symbol]:
                if market["fundingRate"] > 0.1 or market["fundingRate"] < -0.1:
                    high_fr_linear_markets.append(market)
        
        return high_fr_linear_markets