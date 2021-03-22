// Team MLF
// SPDX-License-Identifier: UNLICENSED
pragma solidity >= 0.5.11 <= 0.8.2;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/math/SafeMath.sol';
import '@openzeppelin/upgrades/contracts/Initializable.sol';

contract MLF is Initializable {

    using SafeMath for uint256;

    event Deposited(address indexed payee, uint256 weiAmount);
    event Withdrawn(address indexed payee, uint256 weiAmount);
    event Repaid(address indexed payee, uint256 weiAmount);
    event Approved(address indexed approvedPayee);

    struct LoanInfo {
        uint256 loanTimestamp;
        uint16 loanPeriod;
// interest charged for the loan period. Accounting for the possibility that the lowest interest rate is 0.1%, so
// the value in interest field should be multiplied by 10?
        uint16 interest;         
        bool approved;           // default is false, which means not approved
        uint256 dateWithdrawn;
        address approvingOfficer;
        uint256 borrowAmount;
        uint256 repayAmount;
    }
    
    address[3] public owners;
    mapping(address => LoanInfo) loanInfo;

    modifier noOutstandingLoan() {
        require(loanInfo[msg.sender].borrowAmount == 0, "Borrower has outstanding loan!");
        _;
    } 

    modifier onlyApproved() {
        require(loanInfo[msg.sender].approved, "Loan has not been approved!");
        _;
    }

    modifier validBorrower() {
        require(loanInfo[msg.sender].borrowAmount > 0, 
          "Borrower does not have an outstanding loan application!");
        _;
    }

    function owner1() internal view returns (address result) {
        result = owners[0];
    }

    function owner2() internal view returns (address result) {
        result = owners[1];
    }

    function owner3() internal view returns (address result) {
        result = owners[2];
    }

    modifier validOwners() {
        require(
            owner1() != address(0x0) || 
            owner2() != address(0x0) || 
            owner3() != address(0x0),
          "None of the owners are valid!");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner1() || msg.sender == owner2() || msg.sender == owner3(), 
          "msg.sender is not owner!");
        _;
    }

    modifier sufficientBalance() {
        require(loanInfo[msg.sender].borrowAmount > 0, 
          "Loan amount is larger than available balance!");
        _;
    }

    function setOwner(uint8 index, address _owner) public onlyOwner {
        owners[index] = _owner;
    }

    function initialize(address _owner1) public initializer {
        owners[0] = _owner1;        
    }    
    
    function deposit() public payable {
        emit Deposited(msg.sender, msg.value);
    }

    // Called by the person borrowing the money
    // Checks that the loan has been approved.
    // Checks that there is sufficient balance.
    function withdraw() public onlyApproved sufficientBalance validOwners {
        LoanInfo storage localLoanInfo = loanInfo[msg.sender];
        uint256 loanAmount = localLoanInfo.borrowAmount;
        localLoanInfo.borrowAmount = localLoanInfo.borrowAmount.sub(loanAmount);
        localLoanInfo.dateWithdrawn = block.timestamp;
        msg.sender.transfer(loanAmount);
        emit Withdrawn(msg.sender, loanAmount);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // loanPeriod is in terms of months
    // function is called by the borrower
    function applyLoan(uint256 borrowAmount, uint16 interest, uint16 loanPeriod) public 
      noOutstandingLoan validOwners {
        LoanInfo storage localLoanInfo = loanInfo[msg.sender];
        localLoanInfo.borrowAmount = borrowAmount;
        localLoanInfo.interest = interest;
        localLoanInfo.loanPeriod = loanPeriod;

        // automatic loan approval due to time constraint
        // This shouldn't be automatic
        _approveLoan(owner1(), msg.sender);
    }

    // Approves loan for the borrower, with the approving officer being msgSender
    function _approveLoan(address msgSender, address borrower) internal {
        LoanInfo storage localLoanInfo = loanInfo[borrower];
        localLoanInfo.approved = true;
        localLoanInfo.approvingOfficer = msgSender;
        emit Approved(borrower);
    }

    // Called by one of the owners, approves the loan for the specified borrower
    function approveLoan(address borrower) public onlyOwner {
        _approveLoan(msg.sender, borrower);
    }

    // clears a loan, to be called by one of the owners
    function clearLoan(address borrower) public onlyOwner {
        LoanInfo memory localLoanInfo;
        loanInfo[borrower] = localLoanInfo;
    }

    // Called by the borrower
    // Ensures that the borrower has an outstanding loan.
    // Amount repaid is in msg.value
    function payLoan() public payable validBorrower {
        LoanInfo storage localLoanInfo = loanInfo[msg.sender];
        localLoanInfo.repayAmount = localLoanInfo.repayAmount.add(msg.value);
        emit Repaid(msg.sender, msg.value);
    }

    function getLoan(address borrower) public view returns (LoanInfo memory result) {
        result = loanInfo[borrower];
    }

}