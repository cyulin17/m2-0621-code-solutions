const fs = require('fs');
fs.readFile('data.json', 'utf8', (err, data) => {
  if (err) throw err;

  var obj = JSON.parse(data);

  if (process.argv[2] === 'read') {

    for (const prop in obj.notes) {
      console.log(`${prop}: ${obj.notes[prop]}`);
    }

  }

  if (process.argv[2] === 'create') {

    var id = obj.nextId;
    obj.notes[id] = process.argv[3]
    obj.nextId++;

  }

  var num = process.argv[3];

  if (process.argv[2] === 'update' && obj.notes[num] !== undefined) {

    obj.notes[num] = process.argv[4];

  } else {

    console.log("No notes found.");
  }

  if (process.argv[2] === 'delete') {

    var deleteNum = process.argv[3];
    delete obj.notes[deleteNum];

  }

  var json = JSON.stringify(obj, null, 2);

  fs.writeFile('data.json', json, (err) => {
    if (err) throw err;

  });
});
