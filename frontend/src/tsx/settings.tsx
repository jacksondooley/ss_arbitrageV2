import React, { useContext } from "react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { SettingsContext } from "./Root"
function settings() {

    const {settings, setSettings } = useContext(SettingsContext);
      
    function handleCheck(exchange) {
        console.log(`handleCheck called ${exchange}`)
        setSettings(prevState => {
          const checked = !prevState[exchange];
          return {
            ...prevState,
            [exchange]: checked,
          };
        });
    }
    console.log(settings)
    return (
        <div>
            <div>
                Selected Exchanges
            </div>
            <div>
                <ul>
                    {Object.keys(settings).map((exchange) => {
                        return (
                            <li>
                                <div>
                                    {exchange}
                                </div>
                                <div>
                                    <Checkbox 
                                    isChecked={settings[exchange]}
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