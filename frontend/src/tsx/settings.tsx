import React from "react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useState } from "react"

function settings() {

    const [exchanges, setExchanges] = useState({
        bybit: true,
        kucoin: true,
      });
      
    function handleCheck(exchange) {
        console.log(`handleCheck called ${exchange}`)
        setExchanges(prevState => {
          const checked = !prevState[exchange];
          return {
            ...prevState,
            [exchange]: checked,
          };
        });
    }

    return (
        <div>
            <div>
                Selected Exchanges
            </div>
            <div>
                <ul>
                    {Object.keys(exchanges).map((exchange) => {
                        return (
                            <li>
                                <div>
                                    {exchange}
                                </div>
                                <div>
                                    <Checkbox 
                                    isChecked={exchanges[exchange]}
                                    onChange={()=>handleCheck(exchange)}
                                    />
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default settings