const express = require('express');

const Users = require('../models/Users');
const v = require('./validators');

const router = express.Router();

/**
 * Create an authentication session for the user after authentication.
 * 
 * @name POST /api/users/session
 */
router.post(
  '/', 
  [
    v.ensureUserNotLoggedIn,
    v.ensureValidUsernameInBody,
    v.ensureValidPasswordInBody
  ],
  async (req, res) => {
  try {
    // fetch the user from the DB
    let user = await Users.findByUsername(req.body.username);
    
    // must find user in the DB
    if (!user) {
      res.status(404).json({ error: `Could not find user ${req.body.username}` }).end();
      return;
    }
    
    if ( user.password !== req.body.password) {
      res.status(404).json({ error: `Wrong password for user ${req.body.username}` }).end();
      return;
    }
    
    // authenticate and sign the user in
    req.session.username = user.username;
    req.session.user_id = user.user_id;
    res.status(201).json({user, message: "You are signed in."}).end();

  } catch (error) {
    res.status(503).json({ error: "Could not sign user in" }).end();
  }
});

/**
 * Sign the user out by wiping their authentication session.
 * 
 * @name DELETE /api/users/session
 */
router.delete(
  '/', 
  [v.ensureUserLoggedIn],
  async (req, res) => {
  try {
    // sign out user
    req.session.username = undefined;
    req.session.user_id = undefined;
    res.status(200).json({ message: "Successfuly signed out user!" }).end();

  } catch (error) {
    res.status(503).json({ error: "Could not sign user out" }).end();
  }
});

module.exports = router;