import React, { Component } from 'react';
import './css/mlf.css';
import getWeb3 from './getWeb3';
import LoanContractMeta from './abi/MLF.json';
import contract from 'truffle-contract';


class WithdrawPage extends Component {

    constructor(props) {
        super(props)

        this.state = {}
        this.state.loanAmount = "1";
        if (typeof props.account != "undefined") {
            this.state.account = props.account;
        } else {
            // fallback for testing
            this.state.account = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";
        }
    }

    componentDidMount() {
        document.title = "Withdraw loan"
    }

    handleSubmit = async (event) => {
        try {
            console.log(this.state.account)
            console.log(this.state.borrowAmount)
            console.log(this.state.borrowPeriod)
            console.log(this.state.borrowReason)

            let web3 = await getWeb3()
            let contract = contract(LoanContractMeta)
            contract.setProvider(window.web3.currentProvider)
            const contractInstance = await this.contract.deployed()
            await contractInstance.withdraw()
            console.log("Withdrawn successfully!")
        } catch (error) {
            console.log(error)
        }
    }

    handleBorrowAmountChange = (e) => {
        this.setState({ borrowAmount: e.target.value });
    }
    handleBorrowPeriodChange = (e) => {
        this.setState({ borrowPeriod: e.target.value });
    }
    handleBorrowReasonChange = (e) => {
        this.setState({ borrowReason: e.target.value });
    }

    render() {
        const MaxWidth1564 = {
            "maxWidth": "1564 px"
        }

        return (
            <React.Fragment>
                <div className="w3-content w3-padding" style={MaxWidth1564}>
                    <div className="w3-container w3-padding-32" id="borrow">

                        {/*
            <div className="w3-col l8 m6 w3-margin-bottom">
              <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">My History</h3>
              <div className="w3-col l10 m6 w3-margin-bottom">
                <div className="w3-row-padding">
                  <div className="w3-col l3 m6 w3-margin-bottom w3-center">Loan date</div>
                  <div className="w3-col l3 m6 w3-margin-bottom w3-center">Loan amount(eth)</div>
                  <div className="w3-col l3 m6 w3-margin-bottom w3-center">Repayment Amount</div>
                </div>
                <div className="w3-row-padding">
                  <div id="loandate" className="w3-col l3 m6 w3-margin-bottom w3-center">{loandate}</div>
                  <div id="loanamount" className="w3-col l3 m6 w3-margin-bottom w3-center">{loanamount}</div>
                  <div id="repayment" className="w3-col l3 m6 w3-margin-bottom w3-center">
                    <input className="w3-input w3-section w3-border" maxLength="4" size="4"
                      type="text" placeholder="Repayment amount" required name="Repayment" />
                  </div>
                  <div className="w3-col l3 m6 w3-margin-bottom w3-center">
                    <button className="w3-button w3-black" type="submit"
                      disabled={this.state.disabledRepay}>Repay </button></div>
                </div>
              </div>
            </div>
*/}
                        <div className="w3-col l4 m6 w3-margin-bottom"></div>
                        <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Withdraw</h3>
                        {/*
              <p>Please fill in the details of the loan</p>
*/}
                        <form action="/WithdrawnConfirmationPage" onSubmit={this.handleSubmit}>
                            <div>
                                <input className="w3-input w3-border" type="text" name="account" readOnly value={this.state.account} />
                            </div>
                            <div>
                                <input className="w3-input w3-border" type="text"
                                    name="borrowAmount" readOnly value={this.state.loanAmount} /> ETH
                            </div>
                            <button className="w3-button w3-black w3-section" type="submit" >
                                Withdraw loan into account
                            </button>
                        </form>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}

export default WithdrawPage;
