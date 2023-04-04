export async function fetchFundingRates(): Promise<any> {
    const markets = {};
    const response = await fetch("/api/fundingRates");
    const res = await response.json();
    for (let marketIdx in res.markets) {
        const market = res.markets[marketIdx];
        markets[market[0].baseCurrency] = market;
    }
    return markets;
}

// export function fetchFundingRates(): any{} {
//     const markets = {}
//     fetch("/api/fundingRates")
//         .then((res) => res.json())
//         .then((res) => {
//             for (let marketIdx in res.markets) {
//                 const market = res.markets[marketIdx]
//                 markets[market[0].baseCurrency] = market
//             }
//         })
//     return markets
// }

export async function fetchHighFundingRates(): Promise<any> {
    const markets = {};
    const response = await fetch("/api/highFundingRates");
    const res = await response.json();
    for (let marketIdx in res.markets) {
        const market = res.markets[marketIdx];
        markets[market[0].baseCurrency] = market;
    }
    return markets;
}

export async function fetchEnabledExchanges(): Promise<any> {
    const exchanges = []
    const response = await fetch("/api/activeExchanges")
    const res = await response.json();
    for (let exchange in res.exchanges){
        exchanges.push(exchange)
    }
    return exchanges;
}