import { DataGrid, GridRowsProp, GridColDef, GridCellParams } from '@mui/x-data-grid';
import { DataContext, SettingsContext } from './Root'
import React, { useContext, useState } from 'react'
import { Box } from '@mui/material';
import { useOutletContext, useLocation } from 'react-router-dom'
import "../scss/table.css"

function populateRows(arbs: any[]): GridRowsProp {
    console.log(arbs)
    const rows: GridRowsProp = [];
    arbs.forEach((arb) => {
        const row = {
            id: rows.length + 1,
            currency: arb.baseCurrency,
            exchangeName1: arb.market1.exchange,
            exchangeRate1: arb.market1.fundingRate,
            exchangeName2: arb.market2.exchange,
            exchangeRate2: arb.market2.fundingRate,
            delta: arb.delta,
        }
        rows.push(row)
    })
    return rows;
  }

function createColumns(headerNames: string[]): GridColDef[] {
    const columns: GridColDef[] = [
        { field: 'currency', headerName: 'Currency', width: 150 },
        { field: 'exchangeName1', headerName: 'Exchange 1', width: 150 },
        { field: 'exchangeRate1', headerName: 'Funding Rate 1', width: 150 },
        { field: 'exchangeName2', headerName: 'Exchange 2', width: 150 },
        { field: 'exchangeRate2', headerName: 'Funding Rate 2', width: 150},
        { field: 'delta', headerName: 'Delta', width: 150 },
    ];

    return columns;
}

function ArbTable() {
    const { arbs } = useContext(DataContext)

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
              createColumns([])
              }
            rows={
              populateRows(arbs)
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

export default ArbTable