import React, { Component, useContext } from 'react';
import './css/mlf.css';
import { TextArea } from './TextArea'

class LoanPage extends Component {

  constructor(props) {
    super(props)
    this.state = {}
    if (typeof props.account != "undefined") {
      this.state.account = props.account;
    }
    this.state.disabledRepay = true
  }

  componentDidMount() {
    document.title = "Loan application"
  }

  handleSubmit = async (event) => {
    // event.preventDefault() // prevents form submission, which is not desired.

    console.log(this.state.account)
    console.log(this.state.borrowAmount)
    console.log(this.state.borrowPeriod)
    console.log(this.state.borrowReason)

    // now what?
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

    let loandate = "20/01/2021";
    let loanamount = "1";
    let repayment = "2.1";

    return (
      <React.Fragment>
        <div className="w3-content w3-padding" style={MaxWidth1564}>
          <div className="w3-container w3-padding-32" id="borrow">
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

            <div className="w3-col l4 m6 w3-margin-bottom">
              <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">Borrow</h3>
              <p>Please fill in the details of the loan</p>
              <form action="/LoanConfirmationPage" >
                <fieldset>
                  <input className="w3-input w3-border" type="text" placeholder="Amount in ETH"
                    required name="borrowAmount" onChange={this.handleBorrowAmountChange} />
                  <TextArea Placeholder="Reason for Loan" LabelText="Reason to borrow: "
                    Required Name="borrowReason" value={this.state.borrowReason} Wrap onChange={this.handleBorrowReasonChange} />
                  <div className="form-group">
                    <label htmlFor="borrowPeriod">Months:</label>
                    <input className="w3-input w3-section w3-border" type="number"
                      placeholder="Loan period in months"
                      required name="borrowPeriod" onChange={this.handleBorrowPeriodChange} />
                  </div>
                  <input type="text" hidden name="account" readOnly value={this.state.account} />
                </fieldset>
                <button className="w3-button w3-black w3-section" type="submit" >
                  Submit Application
                </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoanPage;
