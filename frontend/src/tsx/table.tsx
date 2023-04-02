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
import { useOutletContext, useLocation } from 'react-router-dom'
import { arrow } from '@popperjs/core'

// starts at 1 due to currency being 0

interface ArrowState {
    "bybit": number,
    "kucoin": number,
    "coinex": number,
    "phemex": number,
}

const exchangeColEnum = {
    "bybit": 1,
    "kucoin": 2,
    "coinex": 3,
    "phemex": 4,
}

const arrowColor = {
    // 0: "none",
    1: "green",
    2: "red"
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
        if ("image" in Object.keys(market[0])) {
            formattedRows[0] = <Td>
                {market[0].image}
            </Td>
        }
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
    const [arrowState, setArrowState] = useState<ArrowState>(
        {
            "bybit": 0,
            "kucoin": 0,
            "coinex": 0,
            "phemex": 0,
        }
    )

        


    
    function handleArrowClick(column: keyof ArrowState) {
        setArrowState(prevState => {
            return {
                ...prevState,
                ...{[`${column}`]: (prevState[column] + 1) % 3}
            }
        })
        
    }

    function getExchangeRow() {
        const exchanges = []
        for (let exchange in exchangeColEnum) {
            exchanges.push(
                <Td className="column-title">
                    {exchange}
                    {/* <button > */}
                        <ArrowUpDownIcon
                            className="arrow"
                            onClick={() => handleArrowClick(exchange)}
                            style={{ color: arrowColor[arrowState[exchange]]}}
                        />
                    {/* </button> */}
                </Td>
            )
        }
    
        return exchanges
    }

    const [fundingData, setFundingData] = useState([])

    const location = useLocation()
    React.useEffect(() => {
        console.log(location.pathname)
        if (location.pathname === "/allFundingRates") {
            setFundingData([])
        }
        else if (location.pathname === "/extremeFundingRates") {
            setFundingData([])
        }
        else { 
            setFundingData([])
        }
    }, [location])


    return (
        <TableContainer className='table-container bg-light-bg-subtle'>
            <Table variant='simple' size='lg' colorScheme="whiteAlpha" className='table bg-light'>
                {/* <TableCaption placement="top">Funding Rates</TableCaption> */}
                <Thead className="">
                    <Tr>
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