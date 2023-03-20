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

import "./table.css"

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

class FundingTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrowState: {
                "bybit": 0,
                "kucoin": 0,
                "coinex": 0,
                "phemex": 0,
            }
        }
    }

    // const [arrowState, setArrowState] = useState()
    
    handleArrowClick(column) {
        this.state.arrowState[column] = (this.state.arrowState[column] + 1) % 3
        console.log(this.state)
    }

    getExchangeRow() {
        const exchanges = []
        for (let exchange in exchangeColEnum) {
            exchanges.push(
                <Th className="column-title">
                    {exchange}
                    <button onClick={(e) => this.handleArrowClick(exchange)}>
                        <ArrowUpDownIcon/>
                    </button>
                </Th>
            )
        }
    
        return exchanges
    }
    
    render() {

        return (
            <TableContainer>
                <Table variant='simple' size='lg' colorScheme="whiteAlpha">
                    {/* <TableCaption placement="top">Funding Rates</TableCaption> */}
                    <Thead>
                    <Tr>
                        <Th>Currency</Th>
                        {this.getExchangeRow()}
                    </Tr>
                    </Thead>
                    <Tbody>
                    {
                        formatFundingRate(this.props.fundingData).map((row) => {
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
}

export default FundingTable