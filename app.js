const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

// import all the express routes we will be using
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const governmentsRouter = require('./routes/governments');
const billsRouter = require('./routes/bills');
const sessionRouter = require('./routes/session');

// create our app
const app = express();

// set up user session
app.use(session({
  secret: 'Katalog',
  resave: true,
  saveUninitialized: true
}));

// allows us to make requests from POSTMAN
app.use(cors());

// set up the app to use dev logger
app.use(logger('dev'));

// accept json
app.use(express.json());

// https://stackoverflow.com/questions/29960764/what-does-extended-mean-in-express-4-0
// allows object nesting in POST
app.use(express.urlencoded({ extended: false }));

// cookies for sessions
app.use(cookieParser());

// server html+css+js frontend
app.use(express.static(path.join(__dirname, 'dist')));

// connect url hierarchies to our routers
app.use('/', indexRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/governments', governmentsRouter);
app.use('/api/bills', billsRouter);
app.use('/api/users/session', sessionRouter);


app.get('/favicon.ico', function(req, res) { 
  res.sendStatus(204); 
});

app.use('*', function (req, res) {
  res.redirect('/').end();
});

console.log("Running on localhost:3000...");

module.exports = app;
