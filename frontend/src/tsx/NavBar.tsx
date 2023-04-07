import React from "react";
import { Link } from "react-router-dom";
import Sheet from './dataGrid'

function NavBar() {

    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/`}>
                    SS Arbitrage
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={`allFundingRates`}>
                                All Funding Rates
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`extremeFundingRates`}>
                                Extreme Funding Rates
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`arbitrage`}>
                                Arbitrage
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`about`}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`settings`}>
                                Settings
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar