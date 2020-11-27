require('dotenv').config();
require('express-async-errors');
const middlewares = require('./middlewares');
const { db } = require('./database');
const express = require('express');
const session = require('express-session');
const app = express();
const controllers = require('./controllers');
const cors = require('cors');

app.use(express.static(__dirname));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(
  cors({
    'Access-Control-Allow-Origin': '*',
  })
);

db.once('open', () => {
  app.listen(process.env.PORT || 3000);
  console.log('Server is running');
});

app.get('/', function (req, res) {
  res.redirect('/todos');
});

app
  .route('/todos')
  .get(controllers.todos.getAll)
  .post([controllers.uploads.uploadOne, controllers.uploads.uploadImage, controllers.todos.create]);

app.delete('/todos/:id', controllers.todos.remove);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use(middlewares.errorHandler);
