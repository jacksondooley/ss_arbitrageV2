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


const exchangeEnum = {
    "bybit": 1,
    "kucoin": 2,
    "coinex": 3,
}

function getExchangeRow() {
    const exchanges = []
    for (let exchange in exchangeEnum) {
        exchanges.push(
            <Th>
                {exchange}
            </Th>
        )
    }

    return exchanges
}

function formatFundingRate(data: []) {
    const formatedData = []
    for (let key in data) {
        console.log(data[key])
        console.log("--------")
      let map = {
        symbol: data[key][0].baseCurrency,
        fr: data[key][0].fundingRate
      }
      formatedData.push(map)
    }
  
    return formatedData
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
            <Table variant='simple'>
                <TableCaption>Imperial to metric conversion factors</TableCaption>
                <Thead>
                <Tr>
                    <Th>Currency</Th>
                    {getExchangeRow()}
                </Tr>
                </Thead>
                <Tbody>
                {
                    formatFundingRate(data).map((market) => {
                        return (
                            <Tr>
                                <Td>
                                    {market.symbol}
                                </Td>
                                <Td>
                                    -
                                </Td>
                            </Tr>
                        )
                    })
                }
                </Tbody>
                <Tfoot>
                <Tr>
                    <Th>To convert</Th>
                </Tr>
                </Tfoot>
            </Table>
        </TableContainer>
    )
}

export default TableComp