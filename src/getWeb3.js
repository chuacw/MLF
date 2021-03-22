

import Web3 from 'web3';

async function getWeb3() {
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        await window.ethereum.enable();
      } catch (e) {
        // User has denied account access to DApp...
      }
    }
    // Legacy DApp Browsers
    else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }
    // Non-DApp Browsers
    else {
      alert('You have to install MetaMask!');
      return;
    }
    return web3;
}

export default getWeb3;
