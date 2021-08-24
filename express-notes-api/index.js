const express = require('express');
const app = express();
const jsonObj = require('./data.json');
const fs = require('fs');

app.get('/api/notes', function (req, res) {

  const array = [];

  for (const prop in jsonObj.notes) {
    array.push(jsonObj.notes[prop]);
  }
  res.json(array);
});

app.get('/api/notes/:id', function (req, res) {

  const idNum = req.params.id;

  if (Number.isInteger(Number(idNum)) === true && Number(idNum) > 0 && jsonObj.notes[idNum] !== undefined) {
    const result = jsonObj.notes[idNum];
    return res.status(200).send(result);
  } else if (Number.isInteger(Number(idNum)) === true && Number(idNum) > 0) {
    return res.status(404).json({ error: 'cannot find note with id ' + idNum });
  } else {
    return res.status(400).json({ error: 'id must be a positive integer' });
  }

});

app.use(express.json());

app.post('/api/notes', function (req, res) {
  const newPost = req.body;

  if (newPost.content !== undefined) {
    const id = jsonObj.nextId++;
    newPost.id = id;
    jsonObj.notes[id] = newPost;
  } else {
    return res.status(400).json({ error: 'content is a required field' });
  }

  var newData = JSON.stringify(jsonObj, null, 2);
  fs.writeFile('data.json', newData, { encoding: 'utf8' }, err => {

    if (err) {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    } else {
      res.status(201).send(newPost);
    }

  });

});

app.delete('/api/notes/:id', function (req, res) {

  const deleteId = req.params.id;

  if (Number.isInteger(Number(deleteId)) === true && Number(deleteId) > 0 && jsonObj.notes[deleteId] !== undefined) {
    delete jsonObj.notes[deleteId];
  } else if (Number.isInteger(Number(deleteId)) === true && Number(deleteId) > 0) {
    return res.status(404).json({ error: 'cannot find note with id ' + deleteId });
  } else {
    return res.status(400).json({ error: 'id must be a positive integer' });
  }

  var deleteData = JSON.stringify(jsonObj, null, 2);
  fs.writeFile('data.json', deleteData, { encoding: 'utf8' }, err => {
    if (err) {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    } else {
      res.sendStatus(204);
    }
  });
});

app.put('/api/notes/:id', function (req, res) {

  const contentUpdate = req.body;
  const updateId = req.params.id;

  if (Number.isInteger(Number(updateId)) === true && Number(updateId) > 0 && jsonObj.notes[updateId] !== undefined && contentUpdate.content !== undefined) {
    jsonObj.notes[updateId].content = contentUpdate.content;
  } else if (Number.isInteger(Number(updateId)) === true && Number(updateId) > 0 && contentUpdate.content !== undefined) {
    return res.status(404).json({ error: 'cannot find note with id ' + updateId });
  } else if (contentUpdate.content === undefined) {
    return res.status(400).json({ error: 'content is a required field' });
  } else {
    return res.status(400).json({ error: 'id must be a positive integer' });
  }

  var updateData = JSON.stringify(jsonObj, null, 2);
  fs.writeFile('data.json', updateData, { encoding: 'utf8' }, err => {
    if (err) {
      res.status(500).json({ error: 'An unexpected error occurred.' });
    } else {
      res.status(200).send(jsonObj.notes[updateId]);
    }
  });

});

app.listen(3000);
