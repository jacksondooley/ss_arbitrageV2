import coingecko
import json

def getBaseSymbolMap(markets):
    baseSymbolMap = {}
    for marketIdx, ele in enumerate(markets):
        baseCurrency = markets[marketIdx][0]["baseCurrency"]
        baseSymbolMap[baseCurrency] = marketIdx

    return baseSymbolMap

def sort_markets_by_market_cap(markets, market_cap_ranks):
    for market in markets:
        if market.lower() in market_cap_ranks:
            markets[market][0]['rank'] = market_cap_ranks[market.lower()]
        else:
            markets[market][0]['rank'] = 1000 # high value for markets  missing market cap rankings

    markets = {k: v for k, v in sorted(markets.items(), key=lambda market: market[1][0]['rank'])}
    sorted_markets = []
    for market in markets:
        sorted_markets.append(markets[market])

    return sorted_markets

def aggregate_markets(exchanges):
    aggregated_markets = {}
    for exchange in exchanges:
        for market in exchange:
            if market not in aggregated_markets.keys():
                aggregated_markets[market] = []
            aggregated_markets[market].extend(exchange[market])

    coingecko_markets = coingecko.fetch_markets()
    market_cap_rankings = coingecko.fetch_market_cap_rankings(coingecko_markets)

    aggregated_markets = sort_markets_by_market_cap(aggregated_markets, market_cap_rankings)
    return aggregated_markets

def check_arbitrage_opportunities(high_fr_linear_markets, all_linear_markets):
    opportunities = []
    baseSymbolMap = getBaseSymbolMap(all_linear_markets)
    for high_fr in high_fr_linear_markets:
        high_fr = high_fr[0]
        baseCurrency = high_fr["baseCurrency"]
        high_fr_symbol = high_fr["symbol"]
        for market in all_linear_markets[baseSymbolMap[baseCurrency]]:
            if high_fr_symbol != market["symbol"] and high_fr["exchange"] != market["exchange"]:
                delta = high_fr["fundingRate"] - market["fundingRate"]
                delta = round(delta, 4)
                opportunity = { 
                    "baseCurrency": baseCurrency,
                    "market1": high_fr,
                    "market2": market,
                    "delta": delta
                }

                opportunities.append(opportunity)

    return opportunities