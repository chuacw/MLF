 const HDWalletProvider = require('@truffle/hdwallet-provider');
 const configData = require("./.secret.json");
 const infuraKey = configData.InfuraProjectID; // this is Infura Project ID
 const mnemonic = configData.mnemonic;
 
 module.exports = {
   // see https://ethereum.stackexchange.com/questions/19641/how-to-set-the-timeout-for-truffle-tests-before-block
   mocha: {
     enableTimeouts: false,
     bail: true // fail on first failure
   },
   networks: {
     goerli: {
       // goerli, add another key
       provider: () => new HDWalletProvider(mnemonic, `https://goerli.infura.io/v3/${infuraKey}`),
       // provider: () => new Web3.providers.WebsocketProvider(`wss://goerli.infura.io/ws/v3/${infuraKey}`),
       network_id: 5,
       websockets: true,
       gas: 3000000,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     kovan: {
       // Kovan, add another key
       provider: () => new HDWalletProvider(mnemonic, `https://kovan.infura.io/v3/${infuraKey}`),
       network_id: 42,
       websockets: true,
       gas: 3000000,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     rinkeby: {
       // key is currently only configured for Rinkeby. To make it work on Kovan, add another key
       provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`),
       network_id: 4,
       websockets: true,
       gas: 3000000,
       confirmations: 2,
       timeoutBlocks: 200,
       skipDryRun: true
     },
     development: {
       host: "127.0.0.1",
       port: 7545,
       network_id: "*", // Match any network id
       websockets: true
     }
   },
 
   // Set default mocha options here, use special reporters etc.
   mocha: {
     // timeout: 100000
   },
 
   // Configure your compilers
   compilers: {
     solc: {
       // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       // settings: {          // See the solidity docs for advice about optimization and evmVersion
       //  optimizer: {
       //    enabled: false,
       //    runs: 200
       //  },
       //  evmVersion: "byzantium"
       // }
     }
   },  
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    etherscan: `${configData.EtherscanAPI}`
  }  
 };
