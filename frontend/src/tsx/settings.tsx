import React, { useContext } from "react";
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react"
import { useOutletContext } from "react-router-dom"
import { DataContext, SettingsContext } from "./Root"
function settings() {

    const {settings, setSettings } = useContext(SettingsContext);
      
    function handleCheck(exchange) {
        console.log(`handleCheck called ${exchange}`)
        setSettings(prevState => {
          const checked = !exchange.enabled;
          return prevState.map((prevExch) => {
            if (prevExch.exchangeName != exchange.exchangeName) {
                return prevExch
            } else {
                return {exchangeName: exchange.exchangeName, enabled: checked}
            }
          })
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
                    {settings.map((exchange) => {
                        return (
                            <li>
                                <div>
                                    {exchange.exchangeName}
                                </div>
                                <div>
                                    <Checkbox 
                                        checked={exchange.enabled}
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