function calculateInterest(total, year, rate) {
    let interest = (rate/100)+1;
    let result = parseFloat((total*Math.pow(interest, year)).toFixed(4))
    return result;
}

export {calculateInterest}