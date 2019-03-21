const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const database = 'cow';
//////////////////////////////////////////////////
app.use(bodyParser.json());
app.use(express.static('public'));
//////////////////////////////////////////////////
const connection = mysql.createConnection({
  user: 'root',
  password: '',
  database: 'cow'
});

connection.connect();

// ///////////////////////////////////////////////////
app.get('/api/cows', (req, res) => {
  connection.query(`select * from cows`, function(error, results, fields) {
    if (error) {
      res.status(500).send(error)
    }
    var formattedResults = results.map(cow => { return {name: cow.name, description: cow.description}; });
    res.status(200).json(formattedResults);
  });
});
// ///////////////////////////////////////////////////
app.post('/api/cows', (req, res, next) => {
  connection.query(`insert into cows (name, description) values ("${req.body.name}", "${req.body.description}")`,  function (error, results, fields) {
    if (error) throw error;
    //res.status(201).json(results);
    connection.query(`select * from cows where id = insertId`,  function (error, results, fields) {
      res.status(201).json(results);
    });
  });
});

///////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

module.exports = app;

////////////////////////////////////////////////////////

// app.post('/api/cows', (req, res, next) => {
//   connection.query(`select name from cows where name=${req.body.name}`, function (error, results, fields) {
//     if (error) throw error;
//     if (results.length > 0) {
//       res.status(400).send(`Cow already defined with name: ${req.body.name}`);
//     }
//     connection.query(`insert into cows (name, description) values ("${req.body.name}", "${req.body.description}")`,  function (error, results, fields) {
//         if (error) throw error;
//         connection.query(`select * from cows where id = insertId`,  function (error, results, fields) {
//           res.send(JSON.stringify(results));
//         });
//       });
//   });
// });

// ///////////////////////////////////////////////////
// app.post('/api/cows', (req, res, next) => {
//   var name = req.body.name;
//   var description = req.body.description;

//   return models.Cows.get({ name: name })
//     .then(cow => {
//       if (cow) {
//         // Cow already exists; throw Cow to catch and redirect
//         throw cow;
//       }
//       //create cow
//       return models.Cows.create({ name, description });
//     })
//     .then(results => {
//       return models.Cows.get({ id: results.insertId});
//     })
//     .then(results => {
//       res.status(200).send({name: results.name, description: results.description});
//     })
//     .error(error => {
//       res.status(500).send(error);
//     })
//     .catch(cow => {
//       res.status(500).send('Cow already defined with name: ' + cow.name);
//     });
// });


