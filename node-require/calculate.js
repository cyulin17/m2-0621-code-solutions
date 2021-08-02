const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

if (process.argv[3] === 'plus') {
  const result = add(Number(process.argv[2]), Number(process.argv[4]));
  console.log('result:', result);
}

if (process.argv[3] === 'minus') {
  const result = subtract(Number(process.argv[2]), Number(process.argv[4]));
  console.log('result:', result);
}

if (process.argv[3] === 'times') {
  const result = multiply(Number(process.argv[2]), Number(process.argv[4]));
  console.log('result:', result);
}

if (process.argv[3] === 'over') {
  const result = divide(Number(process.argv[2]), Number(process.argv[4]));
  console.log('result:', result);
}
