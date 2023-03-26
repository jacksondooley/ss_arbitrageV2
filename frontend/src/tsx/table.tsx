import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
  import React from 'react'
  import { useState } from 'react'
  import { ArrowUpDownIcon } from '@chakra-ui/icons'

import "../scss/table.css"
import { useOutletContext } from 'react-router-dom'
import { arrow } from '@popperjs/core'

// starts at 1 due to currency being 0

const exchangeColEnum = {
    "bybit": 1,
    "kucoin": 2,
    "coinex": 3,
    "phemex": 4,
}

function formatFundingRate(markets: []) {
    const formatedTable = []
    for (let marketIdx in markets) {
        const market = markets[marketIdx]
        const exhanges = Object.keys(market)
        const formattedRows = [
            <Td>{market[0].baseCurrency}</Td>,
        <Td>-</Td>,
        <Td>-</Td>,
        <Td>-</Td>,
        <Td>-</Td>
    ]
      for (let exchange in exhanges) {
          const b = market[exchange]
          let fr = b.fundingRate
          if (fr > 0.01) {
            formattedRows[exchangeColEnum[b.exchange]] = <Td className="neg">{fr}</Td>
        }
        else if (fr < 0.01) {
            formattedRows[exchangeColEnum[b.exchange]] = <Td className="pos">{fr}</Td>
        }
        else {
            formattedRows[exchangeColEnum[b.exchange]] = <Td className="neu">{fr}</Td>
        }
      }
      formatedTable.push(formattedRows)
    }
  
    return formatedTable
}

function FundingTable() {

    const [arrowState, setArrowState] = useState(
        {
            "bybit": 0,
            "kucoin": 0,
            "coinex": 0,
            "phemex": 0,
        }
    )

    // const [arrowState, setArrowState] = useState()
    
    function handleArrowClick(column: String) {
        setArrowState[column] = (arrowState[column] + 1) % 3
        console.log(arrow)
    }

    function getExchangeRow() {
        const exchanges = []
        for (let exchange in exchangeColEnum) {
            exchanges.push(
                <Th className="column-title">
                    {exchange}
                    <button onClick={(e) => handleArrowClick(exchange)}>
                        <ArrowUpDownIcon/>
                    </button>
                </Th>
            )
        }
    
        return exchanges
    }
    
    const fundingData: [] = useOutletContext();

    return (
        <TableContainer className='table-container bg-light-bg-subtle'>
            <Table variant='simple' size='lg' colorScheme="whiteAlpha" className='table bg-light'>
                {/* <TableCaption placement="top">Funding Rates</TableCaption> */}
                <Thead>
                <Tr className='table-row'>
                    <Th>Currency</Th>
                    {getExchangeRow()}
                </Tr>
                </Thead>
                <Tbody>
                {
                    formatFundingRate(fundingData).map((row) => {
                        return (
                            <Tr>
                                {row}
                            </Tr>
                        )
                    })
                }
                </Tbody>
                <Tfoot>
                </Tfoot>
            </Table>
        </TableContainer>

    )
}

export default FundingTable