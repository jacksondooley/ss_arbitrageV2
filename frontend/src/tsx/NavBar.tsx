import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Sheet from './fundingTable'
import { Dialog, DialogTitle } from "@mui/material";
import { SettingsContext } from "./Root"

// export interface settingsDialogProps {
//     open: boolean;
//     onClose: () => void;
// }

// function SettingsDialog(props: settingsDialogProps) {

//     const { open, onClose } = props;

//     const handleClose = () => {
//         onClose()
//     }

//     return (
//         <Dialog open={open} onClose={handleClose}>
//             <DialogTitle>Settings</DialogTitle>
//         </Dialog>
//     )
// }

function NavBar() {
    // const [openSettings, setOpenSettings] = useState(false)

    // const handleClickOpen = () => {
    //     setOpenSettings(true);
    // }

    // const handleClose = () => {
    //     setOpenSettings(false);
    // }

    return (
        <nav className="navbar navbar-expand-lg bg-white">
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
                            {/* <div className="nav-link" onClick={handleClickOpen}>
                                Settings
                            </div>
                            <SettingsDialog
                                open={openSettings}
                                onClose={handleClose}
                            /> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar