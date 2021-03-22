// import Web3 from 'web3';

// const DISABLED = "disabled";
const CHAINCHANGED = "chainChanged";
const ACCOUNTSCHANGED = "accountsChanged";
const CONNECT = "connect";
const DISCONNECT = "disconnect";

class EthereumProvider {

    eventAccountsChanged = async(accounts) => {
        console.log(`eventAccountsChanged: ${accounts[0]}`)
        if (this.fnAccountsChanged) {
            console.log("Calling fnAccountsChanged")
            this.fnAccountsChanged(accounts)
        }
    }
    eventChainChanged= async(chainId) => {
        console.log("eventChainChanged")
        if (this.fnChainChanged) {
            console.log("Calling fnChainChanged")
            this.fnChainChanged(chainId)
        }
    }

    eventConnected = (connectInfo) => {
        console.log("eventConnected")
        if (this.fnConnected) {
            console.log("Calling fnConnected")
            this.fnConnected(connectInfo);
        }
    }
    eventDisconnected = (error) => {
        console.log("eventDisconnected")
        if (this.fnDisconnected) {
            console.log("Calling fnDisconnected")
            this.fnDisconnected(error)
        }
    }

    handleAccountsChanged = (accounts) => {
        if (this.fnAccountsChanged) {
            this.fnAccountsChanged(accounts)
        }
    }

    async hookEvents(fnConnected, fnDisconnected, fnChainChanged, fnAccountsChanged) {
        if (window.ethereum) {
            let ethereum = window.ethereum;
            if (typeof fnConnected == "function")
                this.fnConnected = fnConnected;
            if (typeof fnDisconnected == "function")
                this.fnDisconnected = fnDisconnected;
            if (typeof fnChainChanged == "function")
                this.fnChainChanged = fnChainChanged;
            if (typeof fnAccountsChanged == "function")
                this.fnAccountsChanged = fnAccountsChanged;
    
            ethereum.removeListener(CONNECT, this.eventConnected);
            ethereum.removeListener(DISCONNECT, this.eventDisconnected);
            ethereum.removeListener(ACCOUNTSCHANGED, this.eventAccountsChanged);
            ethereum.removeListener(CHAINCHANGED, this.eventChainChanged);
            ethereum.on(CONNECT, this.eventConnected);
            ethereum.on(DISCONNECT, this.eventDisconnected);
            ethereum.on(ACCOUNTSCHANGED, this.eventAccountsChanged);
            ethereum.on(CHAINCHANGED, this.eventChainChanged);
        }
    }

    async requestAccounts() {
        try {
          let ethereum = window.ethereum;
          let accounts = await ethereum.request({ method: 'eth_requestAccounts' });
          return accounts
        }
        catch (error) {
          console.log(error);
        }
      }

}

export default EthereumProvider;