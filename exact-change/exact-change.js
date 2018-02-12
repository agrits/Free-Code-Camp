//jshint esversion: 6
Array.prototype.flatten = function(){
  return this.reduce((acc, curr) => acc.concat(curr), []);
};

function counted(array, cid) {
  var grouped = new Object;
  cid.forEach(el => grouped[el[0]] = 0);
  array.forEach(value => grouped[moneyValueToKey(value)] += value);
  return grouped;
};
function howMany(arr){
  let [key, amount] = [arr[0], arr[1]];
  switch(key){
      case "PENNY": return amount/0.01;
      case "NICKEL": return amount/0.05;
      case "DIME": return amount/0.1;
      case "QUARTER": return amount/0.25;
      case "ONE": return amount/1;
      case "FIVE": return amount/5;
      case "TEN": return amount/10;
      case "TWENTY": return amount/20;
      case "ONE HUNDRED": return amount/100;
    }
}
function keyToMoneyValue(key){
   switch(key){
      case "PENNY": return 0.01;
      case "NICKEL": return 0.05;
      case "DIME": return 0.1;
      case "QUARTER": return 0.25;
      case "ONE": return 1;
      case "FIVE": return 5;
      case "TEN": return 10;
      case "TWENTY": return 20;
      case "ONE HUNDRED": return 100;
    }
}
function moneyValueToKey(value){
   switch(value){
       case 0.01: return "PENNY";
       case 0.05: return "NICKEL";
       case 0.1: return "DIME";
       case 0.25: return "QUARTER";
       case 1: return "ONE";
       case 5: return "FIVE";
       case 10: return "TEN";
       case 20: return "TWENTY";
       case 100: return "ONE HUNDRED";
    }
}
function expand(arr){
  return Array.apply(null, Array(arr[1])).map(el => arr[0]);
}
function roundChange(change){
  return Math.round(change*1e7)/1e7;
}
function checkCashRegister(price, cash, cid) {
  var change = cash-price;
  let cashInDrawer = cid.reduce((acc, curr) => acc+curr[1], 0);
  let cashMapped = cid.map(arr => [keyToMoneyValue(arr[0]), Math.round(howMany(arr))]).sort((a,b) => a[0] < b[0]);
  if(cashInDrawer<change)
    return "Insufficient Funds";
  else if (cashInDrawer==change)
    return "Closed";
  else {
    let solution = cashMapped.map(expand).flatten().reduce((acc, curr) => 
      roundChange(acc[0]+curr)<=change ? [acc[0]+curr, acc[1].concat(curr)] : acc,
                                                   [0, []])[1];
    if(solution.reduce((a,b) => a+b, 0) < change)
      return "Insufficient Funds";
    else{
      let solutionCounted = counted(solution, cid);
      return Object.keys(solutionCounted).map(key => [key,     solutionCounted[key]]).filter(pair => pair[1] != 0).reverse();
    }
  }
}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.10],
// ["QUARTER", 4.25],
// ["ONE", 90.00],
// ["FIVE", 55.00],
// ["TEN", 20.00],
// ["TWENTY", 60.00],
// ["ONE HUNDRED", 100.00]]

checkCashRegister(19.50, 20.00, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1.00], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]);
