import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { DataContext, SettingsContext } from './Root'
import { useContext } from 'react'
import { Box } from '@mui/material';

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

function Sheet() {
  const { settings, setSettings} = useContext(SettingsContext)
  const {
    fundingRateData, 
    setFundingRateData, 
    highFundingRateData, 
    setHighFundingRateData
} = useContext(DataContext)

  return (
      <Box 
        sx={{
          height: 700,
          width: "90%",
          '& .positive': {
            color: 'limegreen',
          },
          '& .negative': {
            color: 'red',
          },
        }}
      >
        <DataGrid 
          columns={
            createColumns(
              settings
                .filter(setting => setting.enabled)
                .map(setting => setting.exchangeName)
              )
            }
          rows={
            populateRows(fundingRateData)
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
  );
}

export default Sheet