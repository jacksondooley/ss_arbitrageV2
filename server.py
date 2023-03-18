from flask import Flask
import asyncio
import json
from time import perf_counter
import utils

from bybit.bybit import Bybit
from kucoin.kucoin import Kucoin
from phemex.phemex import Phemex
from coinex.coinex import Coinex
# from hermes import send_message


app = Flask(__name__)

active_exchanges = [
    Bybit(),
    Kucoin(),
    # Coinex(),
    # Phemex(),
]


aggregated_linear_markets = utils.aggregate_markets(
    map(lambda exchange: exchange.all_linear_markets, active_exchanges)
)

aggreated_high_fr_linear_markets = utils.aggregate_markets(
    map(lambda exchange: exchange.high_fr_linear_markets, active_exchanges)
)

@app.route("/api/fundingRates")
def fetch_linear_markets():
    markets = aggregated_linear_markets
    return {"markets": markets}

@app.route("/api/highFundingRates")
def fetch_all_linear_markets():
    markets = aggreated_high_fr_linear_markets
    return {"markets": markets}

@app.route("/api/arbitrageOpportunities")
def fetch_arbitrage_opportunities():
    arbitrageOpportunities = check_arbitrage_opportunities(
        aggreated_high_fr_linear_markets, aggregated_linear_markets
    )
    return {"arbitrageOpportunities": arbitrageOpportunities}


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

#     opps = check_arbitrage_opportunities(aggregared_high_fr_markets, aggregated_linear_markets)
#     print(opps)
    # for market in aggregated_markets:
    #     print(key, count[key], "\n")

    # send_message(bybitMessage + kucoinMessage + phemexMessage + coinexMessage)
    # stop = perf_counter()
    # print("time:", stop - start)


    # phemex.performance_test()
