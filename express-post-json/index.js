var express = require('express');
var app = express();
var nextId = 1;
var grades = {};

app.get('/api/grades', function (req, res) {
  var array = [];
  for (var prop in grades) {
    array.push(grades[prop]);
  }
  res.json(array);
});

app.use(express.json());

app.post('/api/grades', function (req, res) {
  var post = {
    id: nextId,
    name: req.body.name,
    course: req.body.course,
    score: req.body.score
  };

  grades[nextId] = post;
  nextId++;
  res.status(201).send(post);

});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});
