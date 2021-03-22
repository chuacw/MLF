import LoanContractMeta from './abi/MLF.json';
import contract from 'truffle-contract';
import getWeb3 from './getWeb3';

let instance = null

export default class LoanContract {
    constructor() {
        if (!instance) {
            instance = this
        }
        this.applyLoan = this.applyLoan.bind(this);
        return instance
    }

    async init() {
        this.web3 = await getWeb3()
        this.contract = contract(LoanContractMeta)
        this.contract.setProvider(window.web3.currentProvider)
    }

    // function applyLoan(uint256 borrowAmount, uint16 interest, uint16 loanPeriod) 
    async applyLoan(amount, interest, period, account) {
        try {
            const contractInstance = await this.contract.deployed()
            let web3 = this.web3;
            let weiAmount = web3.utils.toHex(web3.utils.toWei(`${amount}`, "ether"))
            console.log(`Getting loan for {account}.`);
            await contractInstance.applyLoan(weiAmount, interest * 100, period, { from: account })
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

}