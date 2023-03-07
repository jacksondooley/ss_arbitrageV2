import { useState } from 'react'
import './App.css'
import React from 'react'
import TableComp from './table'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'



function App() {
  const [fundingRateData, setFundingRateData] = useState(null)

  React.useEffect(() => {
    fetch("/api/fundingRates")
    .then((res) => res.json())
    .then((res) => setFundingRateData(res.markets))
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
              <TableComp fundingData={fundingRateData}/>
            </TabPanel>
          </TabPanels>
        </Tabs>

      </div>
    </div>
  )
}

export default App
