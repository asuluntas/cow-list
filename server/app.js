const express = require('express');
const path = require('path');
const partials = require('express-partials');
const bodyParser = require('body-parser');
const models = require('./models');

const app = express();

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');
app.use(partials());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));


app.get('/api/cows', (req, res) => {
  return models.Cows.getAll().
    then(cows => {
      var formattedCows = cows.map(cow => { return {name: cow.name, description: cow.description}; });
      res.status(200).json(formattedCows);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.post('/api/cows', (req, res, next) => {
  var name = req.body.name;
  var description = req.body.description;

  return models.Cows.get({ name: name })
    .then(cow => {
      if (cow) {
        // Cow already exists; throw Cow to catch and redirect
        throw cow;
      }
      //create cow
      return models.Cows.create({ name, description });
    })
    .then(results => {
      return models.Cows.get({ id: results.insertId});
    })
    .then(results => {
      res.status(200).send({name: results.name, description: results.description});
    })
    .error(error => {
      res.status(500).send(error);
    })
    .catch(cow => {
      res.status(500).send('Cow already defined with name: ' + cow.name);
    });
});

module.exports = app;
