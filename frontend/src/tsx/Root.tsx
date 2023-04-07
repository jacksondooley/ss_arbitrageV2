import { createContext, useState } from 'react'
import '../scss/App.css'
import React from 'react'
import NavBar from './NavBar'
import { Outlet, useLocation, useOutletContext } from 'react-router-dom'
import { fetchEnabledExchanges, fetchFundingRates, fetchHighFundingRates } from '../apiUtils'

export const SettingsContext = createContext(null)
export const DataContext = createContext(null)


function Root() {
  const [fundingRateData, setFundingRateData] = useState<any>([])
  const [highFundingRateData, setHighFundingRateData] = useState<any>(null)
  const [exchanges, setExchanges] = useState<any>(null)

  function fetchArbitrageOpportunities(): void {
    fetch("/api/arbitrageOpportunities")
    .then((res) => res.json())
    .then((res) => console.log(res))
  }

  React.useEffect(() => {
    async function fetchData() {
      const fundingRates = await fetchFundingRates();
      setFundingRateData(fundingRates);
      const highFundingRates = await fetchHighFundingRates();
      setHighFundingRateData(highFundingRates)
      const exchanges = await fetchEnabledExchanges();
      setExchanges(exchanges)
    }

    fetchData()
    fetchArbitrageOpportunities();
  }, [])

  
  function getContextData(): any {
    const location = useLocation();
    if (location.pathname === "/allFundingRates") {
        return fundingRateData
    }
    else if (location.pathname === "/extremeFundingRates") {
        return highFundingRateData
    } 
    return []
  }

  const [settings, setSettings] = useState([
    {exchangeName: 'bybit', enabled: true},
    {exchangeName: 'kucoin', enabled: true},
    {exchangeName: 'coinex', enabled: true},
    {exchangeName: 'phemex', enabled: true},
  ]);

  return (
    <div>
        <NavBar/>
        <SettingsContext.Provider value={{settings, setSettings}}>
          <DataContext.Provider value={
            {
              fundingRateData, 
              setFundingRateData, 
              highFundingRateData, 
              setHighFundingRateData,
              exchanges
            }}>
            <Outlet />
          </DataContext.Provider>
        </SettingsContext.Provider>
    </div>
  )
}

export default Root
