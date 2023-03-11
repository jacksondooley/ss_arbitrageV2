import { useState } from 'react'
import './App.css'
import React from 'react'
import FundingTable from './table'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'


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

  React.useEffect(() => {
    fetchFundingRates();
    fetchHighFundingRates();
  }, [])
  
  return (
    <div className="App">
      <h1>SS Arbitrage</h1>
      <div className="card">
        <Tabs>
          <TabList>
            <Tab>All Funding Rates</Tab>
            <Tab>Extreme Funding Rates</Tab>
            <Tab>Arbitrage</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <FundingTable fundingData={fundingRateData}/>
            </TabPanel>
            <TabPanel>
              <FundingTable fundingData={highFundingRateData}/>
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
