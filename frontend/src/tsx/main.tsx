import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import '../scss/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import '../scss/styles.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Settings from "./settings"
import FundingTable from './fundingTable'
import ArbTable from './arbTable'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "allFundingRates",
        element: <FundingTable/>
      },
      {
        path: "extremeFundingRates",
        element: <FundingTable/>
      },
      {
        path: "arbitrage",
        element: <ArbTable/>
      },
      {
        path: "about",
        element: <div>about</div>
      },
      {
        path: "settings",
        element: <Settings />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)