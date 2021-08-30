const takeAChance = require('./take-a-chance');
const newPromise = takeAChance('ChiaYu');
newPromise.then(value => {
  console.log(value);
});
newPromise.catch(error => {
  console.log(error.message);
});
