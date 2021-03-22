import React, { Component } from 'react';
import './css/mlf.css';
import queryString from 'query-string';
class WithdrawnConfirmationPage extends Component {

    constructor(props) {
        super(props)
        let p = queryString.parse(props.location.search)
        this.state = {
            account: p.account
        }
    }

    componentDidMount() {
        document.title = "Withdraw loan confirmation"
    }

    render = () => {
        const MaxWidth1564 = {
            "maxWidth": "1564 px"
        }
        return (
            <React.Fragment>
                <div className="w3-content w3-padding" style={MaxWidth1564}>
                    <div className="w3-container w3-padding-32" id="about">
                        <p>Funds are withdrawn to account: {this.state.account}.</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default WithdrawnConfirmationPage;
