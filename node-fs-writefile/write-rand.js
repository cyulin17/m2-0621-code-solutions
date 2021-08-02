const fs = require('fs');

var data = Math.random() + '';


fs.writeFile('random.txt', data, (err) => {
  if (err) throw err;
});
