import React from "react";
import { Link } from "react-router-dom";

function NavBar() {

    return (
        <div className="navbar">
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <Link class="navbar-brand" to={`/`}>
                        SS Arbitrage
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link" to={`allFundingRates`}>
                                    All Funding Rates
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`extremeFundingRates`}>
                                    Extreme Funding Rates
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link class="nav-link" to={`arbitrage`}>
                                    Arbitrage
                                </Link>
                            </li>
                            {/* <li class="nav-item">
                                <Link class="nav-link" to={`about`}>
                                    
                                </Link>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavBar