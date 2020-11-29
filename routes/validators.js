const express = require('express');


// ------------------------------ AUTH

const ensureUserNotLoggedIn = function(req, res, next) {
  if (req.session.username) {
    res.status(400).json({ error: "You are signed in!" }).end();
    return;
  }
  next();
};

const ensureUserLoggedIn = function(req, res, next) {
  if (!req.session.username) {
    res.status(401).json({ error: "Must be signed in!" }).end();
    return;
  }
  next();
};

// ------------------------------ BODY

const ensureValidUsernameInBody = function(req, res, next) {
  if (!req.body.username) {
    res.status(400).json({ error: "You must specify a valid username!" }).end();
    return;
  }
  next();
};

const ensureValidPasswordInBody = function(req, res, next) {
  if (!req.body.password) {
    res.status(400).json({ error: "You must specify a valid password!" }).end();
    return;
  }
  next();
};


module.exports = {
  ensureUserNotLoggedIn,
  ensureUserLoggedIn,
  ensureValidUsernameInBody,
  ensureValidPasswordInBody
};