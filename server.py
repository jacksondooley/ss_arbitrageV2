from flask import Flask
import asyncio
import json
from time import perf_counter

from bybit.bybit import Bybit
from kucoin.kucoin import Kucoin
from phemex.phemex import Phemex
from coinex.coinex import Coinex
# from hermes import send_message


app = Flask(__name__)

bybit = Bybit()
coinex = Coinex()
kucoin = Kucoin()
phemex = Phemex()

# print(bybit.all_linear_markets)
# bybitMessage = structure_funding_message(bybit.high_fr_linear_markets, "bybit")

@app.route("/api")
def hello_world():
    return {"message": "test2"}


@app.route("/api/fundingRates")
def fetch_linear_markets():
    markets = aggregate_all_linear_markets(
        bybit.all_linear_markets,
        coinex.all_linear_markets,
        kucoin.all_linear_markets,
        phemex.all_linear_markets,
    )
    return {"markets": markets}


@app.route("/api/highFundingRatesm")
def fetch_all_linear_markets():
    return ""

# def structure_funding_message(fundingRates: [], exchangeName: str) -> str:
#     message = f"---------{exchangeName} Funding Rates---------\n"
#     if len(fundingRates) == 0:
#         message += "no significant funding rates\n"
#     else:
#         for rate in fundingRates:
#             symbol = rate["baseCurrency"]
#             fundingRate = str(rate["fundingRate"])
#             message += f"{symbol}: {fundingRate}\n"

#     return message

def aggregate_all_linear_markets(*exchanges):
    aggregated_markets = {}
    for exchange in exchanges:
        for market in exchange:
            if market not in aggregated_markets.keys():
                aggregated_markets[market] = []
            aggregated_markets[market].extend(exchange[market])

    return aggregated_markets

# def check_arbitrage_opportunities(high_fr_linear_markets, all_linear_markets):
#     message = ""
#     for high_fr in high_fr_linear_markets:
#         baseCurrency = high_fr["baseCurrency"]
#         high_fr_symbol = high_fr["symbol"]
#         for market in all_linear_markets[baseCurrency]:
#             if high_fr_symbol != market["symbol"] and high_fr["exchange"] != market["exchange"]:
#                 delta = high_fr["fundingRate"] - market["fundingRate"]
#                 delta = round(delta, 4)
#                 message += baseCurrency + "\n"
#                 message += json.dumps(high_fr) + "\n"
#                 message += json.dumps(market) + "\n"
#                 message += str(delta) + "\n"
#                 message += "--------------------"

#     return message


# if __name__ == "__main__":

#     print(bybitMessage)

#     kucoin = Kucoin()
#     kucoinMessage = structure_funding_message(kucoin.high_fr_linear_markets, "kucoin")
#     print(kucoinMessage)

#     phemex = Phemex()
#     phemexMessage = structure_funding_message(phemex.high_fr_linear_markets, "phemex")
#     print(phemexMessage)

#     coinex = Coinex()
#     coinexMessage = structure_funding_message(coinex.high_fr_linear_markets, "coinex")
#     print(coinexMessage)

#     # start = perf_counter()

#     aggregared_high_fr_markets = [
#         *bybit.high_fr_linear_markets,
#         *kucoin.high_fr_linear_markets,
#         *phemex.high_fr_linear_markets,
#         *coinex.high_fr_linear_markets
#     ]

#     aggregated_linear_markets = aggregate_all_linear_markets(
#         bybit.all_linear_markets,
#         kucoin.all_linear_markets,
#         phemex.all_linear_markets,
#         coinex.all_linear_markets,
#         )

#     opps = check_arbitrage_opportunities(aggregared_high_fr_markets, aggregated_linear_markets)
#     print(opps)
    # for market in aggregated_markets:
    #     print(key, count[key], "\n")

    # send_message(bybitMessage + kucoinMessage + phemexMessage + coinexMessage)
    # stop = perf_counter()
    # print("time:", stop - start)


    # phemex.performance_test()
