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

const ensureValidNameInBody = function(req, res, next) {
  if (!req.body.name) {
    res.status(400).json({ error: "You must specify a valid name!" }).end();
    return;
  }
  next();
};

const ensureValidDescriptionInBody = function(req, res, next) {
  if (!req.body.description) {
    res.status(400).json({ error: "You must specify a valid description!" }).end();
    return;
  }
  next();
};

const ensureValidURLInBody = function(req, res, next) {
  if (!req.body.url) {
    res.status(400).json({ error: "You must specify a valid url!" }).end();
    return;
  }
  if (!req.body.url.startsWith("https://") && !req.body.url.startsWith("http://")) {
    res.status(400).json({ error: "Missing https:// or http://" }).end();
    return;
  }
  next();
};

const ensureValidAddressInBody = function(req, res, next) {
  if (!req.body.address) {
    res.status(400).json({ error: "You must specify a valid address!" }).end();
    return;
  }
  next();
};

const ensureValidContactInBody = function(req, res, next) {
  if (!req.body.contact) {
    res.status(400).json({ error: "You must specify a valid contact!" }).end();
    return;
  }
  next();
};

const ensureValidClosingDateInBody = function(req, res, next) {
  if (!req.body.closing_date) {
    res.status(400).json({ error: "You must specify a valid closing date!" }).end();
    return;
  }
  // TODO
  // const regex = /^(0?[1-9]|1[012])[\/](0?[1-9]|[12][0-9]|3[01])[\/]\d{4}$/;
  // if (!req.body.closing_date.match(regex)) {
  //   res.status(400).json({ error: "Date format does not match MM/DD/YYYY!" }).end();
  //   return;
  // }
  next();
};

const ensureValidGovernmentInBody = function(req, res, next) {
  if (!req.body.government_id) {
    res.status(400).json({ error: "You must specify a valid government!" }).end();
    return;
  }
  next();
};

const ensureValidUserInBody = function(req, res, next) {
  if (!req.body.user_id) {
    res.status(400).json({ error: "You must specify a valid user!" }).end();
    return;
  }
  next();
};


// ------------------------------ PARAMS

const ensureValidGovernmentInParams = function(req, res, next) {
  if (!req.params.government_id) {
    res.status(400).json({ error: "You must specify a valid government!" }).end();
    return;
  }
  next();
};



module.exports = {
  ensureUserNotLoggedIn,
  ensureUserLoggedIn,
  ensureValidUsernameInBody,
  ensureValidPasswordInBody,
  ensureValidNameInBody,
  ensureValidDescriptionInBody,
  ensureValidURLInBody,
  ensureValidAddressInBody,
  ensureValidContactInBody,
  ensureValidGovernmentInParams,
  ensureValidGovernmentInBody,
  ensureValidUserInBody,
  ensureValidClosingDateInBody
};