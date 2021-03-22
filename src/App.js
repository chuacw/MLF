import './css/App.css';
import './css/mlf.css';
import React, { Component } from 'react';
import NavBar from './NavBar';
import Header from './Header';
import Footer from './Footer';
import ApprovalPage from './ApprovalPage';
import Page from './Page';
import LoanPage from './LoanPage';
import LoanConfirmationPage from './LoanConfirmationPage';
import SetAdminPage from './SetAdminPage';
import WithdrawPage from './WithdrawPage';
import WithdrawnConfirmationPage from './WithdrawnConfirmationPage';
// import { createHashHistory } from 'history';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Web3 from 'web3';
import EthereumProvider from './EthereumProvider';
import AppContext from './AppContext';
class App extends Component {


  shouldComponentUpdate(nextProps, nextState) {
    if (this.state == null) {
      console.log("Should Update");
      return true;
    }
    if ((typeof this.state.account != "undefined") && (this.state.account === nextState.account)) {
      console.log("Won't Update");
      return false;
    }
    console.log("Should Update");
    return true;
  }

  async checkAccountAvailable(events) {
    if ((window.location.pathname === "/") && (this.state.account === "")) {
      await this.requestAccounts(events);
    }
  }

  async componentDidMount() {
    if (window) {
      console.log("Running on client")
      window.addEventListener("pageshow", async (event) => {
        console.log("pageshow");
        if (this.state.events == null) {
          let events = new EthereumProvider()
          events.hookEvents(this.fnConnected, this.fnDisconnected, this.fnChainChanged,
            this.fnAccountsChanged)
          await this.checkAccountAvailable(events)
        }
      })
    }
  }

  async requestAccounts(events) {
    let accounts = await events.requestAccounts()
    if (accounts && (accounts.length > 0)) {
      this.setState({ events: events, account: accounts[0], accounts: accounts });
    } else {
      // getAccounts
      if (this.timer != null) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(
        async function () {
          await this.requestAccounts(events);
        }
          .bind(this),
        500
      );
    }
  }

  componentWillUnmount() {
    if (this.timer != null) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  async loadBlockchainData() {
    // Modern DApp Browsers
    let lweb3;
    if (window.ethereum) {
      lweb3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      lweb3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert('You have to install MetaMask!');
      return;
    }
    const web3 = lweb3;
    if ((typeof web3 != "undefined") && (this.state.account === "")) {
      try {
        const accounts = await this.requestAccounts()
        console.log("web3.eth.getAccounts")
        if (typeof accounts != "undefined") {
          this.setState({ account: accounts[0], accounts: accounts })
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  fnConnected(connectInfo) {
    console.log(connectInfo)
  }
  fnDisconnected(error) {
    console.log(error)
    this.setState({ account: "", accounts: null })
    this.checkAccountAvailable(this.state.events)
  }
  fnChainChanged(chainId) {
    console.log(chainId)
  }
  fnAccountsChanged(accounts) {
    console.log("accounts changed!")
    if (accounts.length > 0) {
      this.setState({ account: accounts[0], accounts: accounts })
    } else {
      this.setState({ account: "", accounts: null })
      this.checkAccountAvailable(this.state.events)
    }
  }

  constructor(props) {
    super(props)
    let account = "", accounts = []
    if (window.location.pathname !== "/") {
      let params = (new URL(document.location)).searchParams;
      if (params.has("account")) {
        account = params.get("account")
        accounts = [account]
      }
    }
    this.state = { account: account, accounts: accounts, events: null }
    this.fnAccountsChanged = this.fnAccountsChanged.bind(this)
    this.fnChainChanged = this.fnChainChanged.bind(this)
    this.fnConnected = this.fnConnected.bind(this)
    this.fnDisconnected = this.fnDisconnected.bind(this)
    this.loadBlockchainData = this.loadBlockchainData.bind(this)
    this.requestAccounts = this.requestAccounts.bind(this)
    this.timer = null
  }


  render() {
    return (
      <React.Fragment>
        
          <NavBar />
          <Header />
          <Router>
            <Switch>
              <Route exact path='/' component={Page} />
              <Route exact path='/ApprovalPage' component={ApprovalPage} />
              <Route exact path='/LoanPage' render={props => <LoanPage account={this.state.account} />} />
              <Route exact path='/LoanConfirmationPage' component={LoanConfirmationPage} />
              <Route exact path='/WithdrawPage' render={props => <WithdrawPage account={this.state.account} />} />
              <Route exact path='/WithdrawnConfirmationPage' component={WithdrawnConfirmationPage} />
              <Route exact path='/SetAdminPage' component={SetAdminPage} />
            </Switch>
          </Router>
          <Footer />
          <div className="container">
            <p>Your account: {this.state.account === "" ? "Not available" : this.state.account}</p>
          </div>
        
      </React.Fragment>
    );
  }
}


export default App;
