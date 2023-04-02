import { useState } from 'react'
import '../scss/App.css'
import React from 'react'
import FundingTable from './Table'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import NavBar from './NavBar'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'


function Root() {
  const [fundingRateData, setFundingRateData] = useState(null)
  const [highFundingRateData, setHighFundingRateData] = useState(null)
  
  function fetchFundingRates(): void {
    fetch("/api/fundingRates")
    .then((res) => res.json())
    .then((res) => {
      const markets = {}
      for (let marketIdx in res.markets) {
        const market = res.markets[marketIdx]
        markets[market[0].baseCurrency] = market
      }
      setFundingRateData(markets)
    })
  }

  function fetchHighFundingRates(): void {
    fetch("/api/highFundingRates")
    .then((res) => res.json())
    .then((res) => {
      const markets = {}
      for (let marketIdx in res.markets) {
        const market = res.markets[marketIdx]
        markets[market[0].baseCurrency] = market
      }
      setHighFundingRateData(markets)
    })
  }

  function fetchArbitrageOpportunities(): void {
    fetch("/api/arbitrageOpportunities")
    .then((res) => res.json())
    .then((res) => console.log(res))
  }

  React.useEffect(() => {
    fetchFundingRates();
    fetchHighFundingRates();
    fetchArbitrageOpportunities();
  }, [])

  
  function getContextData(): any {
    const location = useLocation();
    console.log(location)
    if (location.pathname === "/allFundingRates") {
        return fundingRateData
    }
    else if (location.pathname === "/extremeFundingRates") {
        return highFundingRateData
    } 
    return []
  }
  
  return (
    <div>
        <NavBar/>
        <Outlet context={getContextData()}/>
    </div>
  )
}

export default Root
