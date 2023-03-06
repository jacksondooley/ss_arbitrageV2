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


// starts at 1 due to currency being 0
const exchangeColEnum = {
    "bybit": 1,
    "kucoin": 2,
    "coinex": 3,
    "phemex": 4,
}

function getExchangeRow() {
    const exchanges = []
    for (let exchange in exchangeColEnum) {
        exchanges.push(
            <Th>
                {exchange}
            </Th>
        )
    }

    return exchanges
}

function formatFundingRate(markets: []) {
    const formatedTable = []
    // console.log(markets)
    for (let marketIdx in markets) {
      const formattedRow = []
      const market = markets[marketIdx]
      console.log(market)
      const exhanges = Object.keys(market)
      const rows = [
        <Td>{market[0].baseCurrency}</Td>,
        <Td>-</Td>,
        <Td>-</Td>,
        <Td>-</Td>,
        <Td>-</Td>
      ]
      for (let exchange in exhanges) {
        const b = market[exchange]
        rows[exchangeColEnum[b.exchange]] = <Td>{b.fundingRate}</Td>
      }
      formatedTable.push(rows)
    }
  
    return formatedTable
  }

function TableComp() {
    const [data, setData] = useState(null)

    React.useEffect(() => {
      fetch("/api/bybit")
      .then((res) => res.json())
      // .then((res) => console.log(res))
      .then((res) => setData(res.markets))
  
    }, [])



    return (
        <TableContainer>
            <Table variant='simple' size='lg' colorScheme="whiteAlpha">
                <TableCaption placement="top">Funding Rates</TableCaption>
                <Thead>
                <Tr>
                    <Th>Currency</Th>
                    {getExchangeRow()}
                </Tr>
                </Thead>
                <Tbody>
                {
                    formatFundingRate(data).map((row) => {
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

export default TableComp