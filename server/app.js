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
  console.log('get api cows request received');
  return models.Cows.getAll().
    then(cows => {
      res.status(200).json(cows);
    })
    .error(error => {
      res.status(500).send(error);
    });
});

app.post('/api/cows', (req, res, next) => {
  // var username = req.body.username;
  // var password = req.body.password;
  // //check for users
  // return models.Users.get({ username })
  //   .then(user => {
  //     if (user) {
  //       // user already exists; throw user to catch and redirect
  //       throw user;
  //     }
  //     //create user
  //     return models.Users.create({ username, password });
  //   })
  //   .then(results => {
  //     //upgrade session associate with user
  //     models.Sessions.update({ hash: req.session.hash }, { userId: results.insertId });
  //   })
  //   .then(() => {
  //     //redirect user to routes
  //     res.redirect('/');
  //   })
  //   .error(error => {
  //     res.status(500).send(error);
  //   })
  //   .catch(user => {
  //     res.redirect('/signup');
  //   });
});

module.exports = app;
