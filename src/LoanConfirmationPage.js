import React, { Component, useContext } from 'react';
import './css/mlf.css';
import queryString from 'query-string';
import { format } from "date-fns";
import { calculateInterest } from './Finance';

import LoanContract from './LoanContract';

class LoanConfirmationPage extends Component {

  constructor(props) {
    super(props)
    let p = queryString.parse(props.location.search)
    let d = new Date();
    d.setMonth(d.getMonth() + Number(p.borrowPeriod))
    let interest = 4.000;
    let total = calculateInterest(p.borrowAmount, p.borrowPeriod / 12, interest);
    this.state = {
      initialApplicationStatus: "Let us process your application and we will get back to you within 1 hour.",
      applicationStatus: "Please wait as we process the application",
      account: p.account,
      displayAccount: "PLEASE WAIT",
      borrowAmount: p.borrowAmount,
      displayBorrowAmount: "PLEASE WAIT",
      borrowPeriod: p.borrowPeriod,
      displayBorrowPeriod: "PLEASE WAIT",
      borrowReason: p.borrowReason ? p.borrowReason : "",
      displayBorrowReason: "PLEASE WAIT",
      duedate: format(d, "dd MMM yyyy"),
      displayDueDate: "PLEASE WAIT",
      interest: Number(interest).toFixed(3),
      displayInterest: "PLEASE WAIT",
      total: total,
      displayTotal: "PLEASE WAIT",
      currency: "ETH"
    }
    this.applyLoan = this.applyLoan.bind(this);
  }

  async applyLoan() {
    try {
      const loanContract = new LoanContract();
      await loanContract.init();
      let p = this.state;
      let successful = await loanContract.applyLoan(p.borrowAmount, p.interest, p.borrowPeriod, p.account);
      if (successful) {
        this.setState({
          initialApplicationStatus: "",
          applicationStatus: "Your application is successful",
          displayAccount: p.account,
          displayBorrowAmount: p.borrowAmount,
          displayBorrowPeriod: p.borrowPeriod,
          displayBorrowReason: p.borrowReason,
          displayDueDate: p.duedate,
          displayTotal: p.total,
          displayInterest: p.interest,
        })
      } else {
        this.setState({
          initialApplicationStatus: "",
          applicationStatus: "Your application is not successful",
          displayAccount: p.account,
          displayBorrowAmount: "Not Applicable",
          displayBorrowPeriod: "Not Applicable",
          displayBorrowReason: "Not Applicable",
          displayTotal: "Not Applicable",
          displayDueDate: "Not Applicable",
          displayInterest: "Not Applicable",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    document.title = "Loan confirmation"
    // apply loan?
    // call apply Loan
    setTimeout(
      function () {
        this.applyLoan();
      }
        .bind(this),
      500
    );
    
  }

  render = () => {
    const MaxWidth1564 = {
      "maxWidth": "1564 px"
    }
    return (
      <React.Fragment>
        <div className="w3-content w3-padding" style={MaxWidth1564}>
          <div className="w3-container w3-padding-32" id="about">
            <h3 className="w3-border-bottom w3-border-light-grey w3-padding-16">
              {this.state.applicationStatus}
            </h3>
            <p>{this.state.initialApplicationStatus}</p>
            <p>These are your loan details:</p>
            <p>Account: {this.state.displayAccount}</p>
            <p>Loan amount: {this.state.displayBorrowAmount} {this.state.currency}</p>
            <p>Loan period: {this.state.displayBorrowPeriod} months</p>
            <p>Loan reason: {this.state.borrowReason}</p>
            <p>Interest: {this.state.displayInterest}%</p>
            <p>Total: {this.state.displayTotal} {this.state.currency}</p>
            <p>Due date: {this.state.displayDueDate}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoanConfirmationPage;
