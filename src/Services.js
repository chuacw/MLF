import React from 'react';
import './css/mlf.css';
import LendImage from './images/lend.jpg';
import LoanImage from './images/loan.jpg';
import CrowdfundImage from './images/crowdfund.jpg';

import {
    Link
} from "react-router-dom";

function Services(props) {
    const Width100 = {
        "width": "100%"
    };
    return (
        <React.Fragment>
            <div className="w3-container w3-padding-32" id="services">
                <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Services</h3>
            </div>
            <div className="w3-row-padding">
                <div className="w3-col l4 m6 w3-margin-bottom">
                    <div className="w3-display-container">
                        <div className="w3-display-middle w3-black w3-padding">
                            <Link to='/ApprovalPage' className="w3-bar-item w3-button">
                                <h2>Approve</h2>
                            </Link>
                        </div>
                        <img src={LendImage} alt="Lend" style={Width100} />
                    </div>
                </div>
                <div className="w3-col l4 m6 w3-margin-bottom">
                    <div className="w3-display-container">
                        <div className="w3-display-middle w3-black w3-padding">
                            <Link to='/LoanPage' className="w3-bar-item w3-button">
                                <h2>Loan</h2>
                            </Link>
                        </div>
                        <img src={LoanImage} alt="Loan" style={Width100} />
                    </div>
                </div>
                <div className="w3-col l4 m6 w3-margin-bottom">
                    <div className="w3-display-container">
                        <div className="w3-display-middle w3-black w3-padding">
                            <Link to='/WithdrawPage' className="w3-bar-item w3-button">
                                <h2>Withdraw</h2>
                            </Link>
                        </div>
                        <img src={CrowdfundImage} alt="Crowdfund" style={Width100} />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Services;
