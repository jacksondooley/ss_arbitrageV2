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
import FundingTable from './table'
import Settings from "./settings"
import Sheet from './dataGrid'

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
        element: <FundingTable />
      },
      {
        path: "arbitrage",
        element: <Sheet/>
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