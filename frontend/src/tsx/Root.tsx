import { useState } from 'react'
import '../scss/App.css'
import React from 'react'
import FundingTable from './Table'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { RepeatIcon } from '@chakra-ui/icons'
import NavBar from './NavBar'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { fetchFundingRates, fetchHighFundingRates } from '../apiUtils'


function Root() {
  const [fundingRateData, setFundingRateData] = useState(null)
  const [highFundingRateData, setHighFundingRateData] = useState(null)

  function fetchArbitrageOpportunities(): void {
    fetch("/api/arbitrageOpportunities")
    .then((res) => res.json())
    .then((res) => console.log(res))
  }

  React.useEffect(() => {
    setFundingRateData(fetchFundingRates());
    setHighFundingRateData(fetchHighFundingRates());
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
