export default function formatCurrency(
  amount: number,
  currency: string
) {
  const integerNum = amount.toFixed(2).split('.')[0];
  const decimalNum = amount.toFixed(2).split('.')[1];
  const reversestring = integerNum.split('').reverse();
  let count = 0;
  let tempstring = '';
  for (let i = 0; i < reversestring.length; i++) {
    count++;
    if (count % 3 === 1 && count != 1) {
      tempstring = reversestring[i] + ',' + tempstring;
    } else {
      tempstring = reversestring[i] + tempstring;
    }
  }
  return tempstring + '.' + decimalNum + currency;
}
