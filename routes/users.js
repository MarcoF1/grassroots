const express = require('express');

const Users = require('../models/Users');
const v = require('./validators');

const router = express.Router();

/**
 * Get all users.
 * 
 * @name GET /api/users
 */
router.get(
  '/', 
  [],
  async (req, res) => {
  try {
    // fetch all user from the DB
    let users = await Users.findAll();
    res.status(200).json(users).end();

  } catch (error) {
    res.status(503).json({ error: "Could not fetch users" }).end();
  }
});

/**
 * Create new user.
 * 
 * @name POST /api/users
 */
router.post(
  '/',
  [
    v.ensureValidUsernameInBody,
    v.ensureValidPasswordInBody
  ],
  async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    // issue a call to the DB to create a new user with the given username
    let user = await Users.addOne(username, password);
    res.status(201).json({ user, message: "Please sign in to continue." }).end();
    
  } catch (error) {
    res.status(400).json({ error: "Username must be unique and non-empty" }).end();
  }
});

/**
 * Update the username for logged in user
 * 
 * @name PUT/api/users/username
 * @param {string} username 
 */
router.put(
  '/username',
  [
    v.ensureUserLoggedIn,
    v.ensureValidUsernameInBody,
  ],
  async (req, res) => {
  try {

    const username = req.body.username;
    if (req.session.username === username) {
      res.status(400).json({ error: `Username is already (${username})`}).end();
      return;
    }

    let existingUser = await Users.findOne(username);
    if (existingUser) {
      res.status(400).json({ error: `There is already a user with the username (${username})`}).end();
    }
    
    let user = await Users.updateUsername(req.session.username, username)
    if (user) {
      req.session.username = username;
      res.status(200).json({ message: `Username changed to (${username})`}).end();
    }
  } catch (error) {
      res.status(400).json({ error: `Could not change the username!` }).end();
  }
});

/**
 * Update the password for logged in user
 * @name PUT/api/users/password
 * @param {string} password 
 */
router.put(
  '/password',
  [
    v.ensureUserLoggedIn,
    v.ensureValidPasswordInBody,
  ],
  async (req, res) => {
  try {
    let user = await Users.updatePassword(req.session.username, req.body.password);
    if (user) {
      res.status(200).json({message: `Password succesfully changed!`}).end();
    }
  } catch (error) {
    res.status(503).json({ error: `Could not change your password` }).end();
    return;
  }
});


module.exports = router;
