export function fetchFundingRates(): any{} {
    fetch("/api/fundingRates")
    .then((res) => res.json())
    .then((res) => {
        const markets = {}
        for (let marketIdx in res.markets) {
            const market = res.markets[marketIdx]
            markets[market[0].baseCurrency] = market
        }
        return markets
    })
}

export function fetchHighFundingRates(): any{} {
    fetch("/api/highFundingRates")
    .then((res) => res.json())
    .then((res) => {
      const markets = {}
      for (let marketIdx in res.markets) {
        const market = res.markets[marketIdx]
        markets[market[0].baseCurrency] = market
      }
      return markets
    })
  }