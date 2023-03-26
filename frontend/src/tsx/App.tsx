import { useState } from 'react'
import '../scss/App.css'
import React from 'react'
import FundingTable from './table'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import NavBar from './NavBar'


function App() {
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
  
  return (
    <div>
      <NavBar/>
      <div className="header">
        <Tabs>
          <TabList>
            <Tab>All Funding Rates</Tab>
            <Tab>Extreme Funding Rates</Tab>
            <Tab>Arbitrage</Tab>
            <Tab>About</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FundingTable fundingData={fundingRateData}/>
            </TabPanel>
            <TabPanel>
              <FundingTable fundingData={highFundingRateData}/>
            </TabPanel>
            <TabPanel>
              Arbitrage
            </TabPanel>
            <TabPanel>
              About
            </TabPanel>
          </TabPanels>
        </Tabs>
        <button onClick={fetchFundingRates}>
          <RepeatIcon/>
        </button>
      </div>
    </div>
  )
}

export default App
