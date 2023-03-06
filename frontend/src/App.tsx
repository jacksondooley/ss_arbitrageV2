import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import React from 'react'
import TableComp from './table'




function App() {
  const [data, setData] = useState(null)

  React.useEffect(() => {
    fetch("/api/linear_markets")
    .then((res) => res.json())
    // .then((res) => console.log(res))
    .then((res) => setData(res.markets))
  }, [])
  
  return (
    <div className="App">
      <h1>SS Arbitrage</h1>
      <div className="card">
        <TableComp/>
      </div>
    </div>
  )
}

export default App
