import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

import React from 'react'


function formatData(data: []) {
  const formatedData = []
  for (let key in data) {
    let symbol = data[key][0].baseCurrency
    formatedData.push(symbol)
  }

  return formatedData
}

function App() {
  const [count, setCount] = useState(0)

  const [data, setData] = useState(null)

  React.useEffect(() => {
    fetch("/api/linear_markets")
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => setData(res.markets))

  }, [])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          {!data ? "loading": 
          <ul>
            {formatData(data).map((symbol) => {
              return <li>{symbol}</li>
            })}
          </ul>
          }
        </p>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
