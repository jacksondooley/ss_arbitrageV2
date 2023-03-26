import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './Root'
import '../scss/index.css'
import { ChakraProvider } from '@chakra-ui/react'
import '../scss/styles.scss'
import * as bootstrap from 'bootstrap'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import FundingTable from './Table'

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
        element: <div>Coming Soon</div>
      },
      {
        path: "about",
        element: <div>about</div>
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
)