var express = require('express');
var app = express();
const pg = require('pg');
const db = new pg.Pool({
  connectionString: 'postgres://dev:dev@localhost/studentGradeTable',
  ssl: {
    rejectUnauthorized: false
  }
});

app.use(express.json());

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select "gradeId",
           "name",
           "course",
           "score",
           "createdAt"
      from "grades"
      `;
  db.query(sql)
    .then(result => {
      const getRows = result.rows;
      res.status(200).json(getRows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.post('/api/grades', (req, res, next) => {

  const newName = req.body.name;
  const newCourse = req.body.course;
  const newScore = req.body.score;

  const scoreNum = parseInt(newScore, 10);

  if (newName === undefined && newCourse !== undefined && newScore !== undefined) {
    return res.status(400).json({ error: '"name" is a required field.' });
  } else if (newName !== undefined && newCourse === undefined && newScore !== undefined) {
    return res.status(400).json({ error: '"course" is a required field.' });
  } else if (newName !== undefined && newCourse !== undefined && newScore === undefined) {
    return res.status(400).json({ error: '"score" is a required field.' });
  } else if (newName === undefined && newCourse === undefined && newScore !== undefined) {
    return res.status(400).json({ error: '"name" and "course" are required.' });
  } else if (newName !== undefined && newCourse === undefined && newScore === undefined) {
    return res.status(400).json({ error: '"course" and "score" are required.' });
  } else if (newName === undefined && newCourse !== undefined && newScore === undefined) {
    return res.status(400).json({ error: '"name" and "score" are required.' });
  } else if (newName !== undefined && newCourse !== undefined && newScore !== undefined) {
    if (!Number.isInteger(scoreNum)) {
      return res.status(400).json({ error: '"score" must be an integer.' });
    } else if (Number.isInteger(scoreNum) && (scoreNum < 0 || scoreNum > 100)) {
      return res.status(400).json({ error: '"score" must be an integer from 0 to 100.' });
    }
  }

  const sql = `
    insert into "grades" ("name", "course", "score")
    values ($1, $2, $3)
    returning *
  `;

  const values = [newName, newCourse, newScore];

  db.query(sql, values)
    .then(result => {
      const insertRow = result.rows[0];
      res.status(201).send(insertRow);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });

});

app.put('/api/grades/:gradeId', (req, res, next) => {

  const gradeId = parseInt(req.params.gradeId, 10);
  const updateName = req.body.name;
  const updateCourse = req.body.course;
  const updateScore = req.body.score;
  const scoreNum = parseInt(updateScore, 10);

  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({ error: '"gradeId" must be a positive integer.' });
  } else {
    if (updateName === undefined && updateCourse !== undefined && updateScore !== undefined) {
      return res.status(400).json({ error: '"name" is a required field.' });
    } else if (updateName !== undefined && updateCourse === undefined && updateScore !== undefined) {
      return res.status(400).json({ error: '"course" is a required field.' });
    } else if (updateName !== undefined && updateCourse !== undefined && updateScore === undefined) {
      return res.status(400).json({ error: '"score" is a required field.' });
    } else if (updateName === undefined && updateCourse === undefined && updateScore !== undefined) {
      return res.status(400).json({ error: '"name" and "course" are required.' });
    } else if (updateName !== undefined && updateCourse === undefined && updateScore === undefined) {
      return res.status(400).json({ error: '"course" and "score" are required.' });
    } else if (updateName === undefined && updateCourse !== undefined && updateScore === undefined) {
      return res.status(400).json({ error: '"name" and "score" are required.' });
    } else if (updateName !== undefined && updateCourse !== undefined && updateScore !== undefined) {
      if (!Number.isInteger(scoreNum)) {
        return res.status(400).json({ error: '"score" must be an integer.' });
      } else if (Number.isInteger(scoreNum) && (scoreNum < 0 || scoreNum > 100)) {
        return res.status(400).json({ error: '"score" must be an integer from 0 to 100.' });
      }
    }
  }

  const sql = `
    update "grades"
       set "name" = $1,
           "course" = $2,
           "score" = $3
     where "gradeId" = $4
     returning *
  `;

  const update = [updateName, updateCourse, updateScore, gradeId];

  db.query(sql, update)
    .then(result => {
      const updateRow = result.rows[0];
      if (!updateRow) {
        res.status(404).json({ error: `cannot find grade with "gradeId" ${gradeId}` });
      } else {
        res.status(200).send(updateRow);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.delete('/api/grades/:gradeId', (req, res, next) => {

  const gradeId = parseInt(req.params.gradeId, 10);
  if (!Number.isInteger(gradeId) || gradeId <= 0) {
    return res.status(400).json({ error: '"gradeId" must be a positive integer' });
  }

  const sql = `
    delete from "grades"
     where "gradeId" = $1
     returning *
  `;

  const deleteGrade = [gradeId];

  db.query(sql, deleteGrade)
    .then(result => {
      const deleteRow = result.rows[0];
      if (!deleteRow) {
        res.status(404).json({ error: `cannot find grade with "gradeId" ${gradeId}` });
      } else {
        res.sendStatus(204);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
});

app.listen(3000);
