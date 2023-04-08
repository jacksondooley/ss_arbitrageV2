import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { DataContext, SettingsContext } from './Root'
import React, { useContext, useState } from 'react'
import { Box } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom'
import "../scss/table.css"
import { auto } from '@popperjs/core';

function populateRows(data: {}): GridRowsProp {
  const rows: GridRowsProp = [];
  Object.keys(data).forEach((baseCurrency) => {
    const markets = data[baseCurrency]
    const row = { 
      id: rows.length + 1, 
      currency: baseCurrency,
      bybit: "-",
      kucoin: "-",
      coinex: "-",
      phemex: "-"
    }
    markets.forEach((market) => {
      row[market.exchange] = market.fundingRate
    })
    rows.push(row)
  })
  return rows;
}

function createColumns(headerNames: string[]): GridColDef[] {
  const columns: GridColDef[] = [
    { field: 'currency', headerName: 'Currency', width: 150 },
  ];
  headerNames.forEach((headerName) => {
    columns.push({
      field: headerName,
      headerName: headerName.charAt(0).toUpperCase() + headerName.slice(1),
      width: 150,
    })
  })

  return columns
}

function FundingTable() {
  const { settings, setSettings} = useContext(SettingsContext)
  const {
    fundingRateData,
    highFundingRateData,
  } = useContext(DataContext)

  const location = useLocation()
  const [fundingData, setFundingData] = useState([])
  React.useEffect(() => {
      console.log(location.pathname)
      if (location.pathname === "/allFundingRates") {
          setFundingData(fundingRateData)
      }
      else if (location.pathname === "/extremeFundingRates") {
          setFundingData(highFundingRateData)
      }
  }, [location])

  return (
    <div className='table-container'>
      <Box 
        sx={{
          height: "45rem",
          '& .positive': {
            color: 'limegreen',
          },
          '& .negative': {
            color: 'red',
          },
        }}
      >
        <DataGrid
          className='data-grid'
          columns={
            createColumns(
              settings
                .filter(setting => setting.enabled)
                .map(setting => setting.exchangeName)
              )
            }
          rows={
            populateRows(fundingData)
          }
          getCellClassName={(params: GridCellParams<any, any, number>) => {
            if (params.field === 'currency' || params.value === "-") {
              return '';
            }
            else if (params.value > 0.01) {
              return 'positive'
            }
            else if (params.value <= -0.01) {
              return 'negative'
            }
            return ''
          }}
        />
      </Box>
    </div>
  );
}

export default FundingTable