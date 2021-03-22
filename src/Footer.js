import React from 'react';
import './css/mlf.css';

function Footer(props) {
    return (
        <React.Fragment>
            <footer className="w3-center w3-black w3-padding-16">
            <p>© 2020, MLF
			<a href="/SetAdminPage" className="w3-bar-item w3-button">Admin</a>
			</p>
            </footer>
        </React.Fragment>
    );
}

export default Footer;
