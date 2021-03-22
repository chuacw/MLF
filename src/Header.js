import React from 'react';
import './css/mlf.css';
import ConnectImage from "./images/connect.jpg";

function Header(props) {
    const MaxWidth1500 = {
        "maxWidth": "1500px"
    };
    return (
        <React.Fragment>
            <header className="w3-display-container w3-content w3-wide" style={MaxWidth1500} id="home">
                <img className="w3-image" src={ConnectImage} alt="Architecture" width="1500" height="800" />
                <div className="w3-display-middle w3-margin-top w3-center">
                    <h1 className="w3-xxlarge w3-text-white">
                        <span className="w3-padding w3-black w3-opacity-min"><b>MLF</b></span>
                        <span className="w3-hide-small w3-text-light-grey">Connecting People</span>
                    </h1>
                </div>
            </header>
        </React.Fragment>
    );
}

export default Header;
