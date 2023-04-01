import requests


def fetch_markets():
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        "vs_currency": "usd",
        "per_page": "250",
        "page": "1"
    }
    # url =" https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
    response = requests.get(url, params=params)
    response = response.json()
    # print(response)
    return response

def fetch_market_cap_rankings(markets):
    # market_cap_rankings = []
    market_cap_rankings = {}
    for market in markets[0:10]:
        print(market)
        market_cap_rankings[market['symbol'].lower()] = {
            "rank": market['market_cap_rank'],
            "image": market["image"]
        }
        # market_cap_rankings.push(market)

    print(market_cap_rankings)

    return market_cap_rankings