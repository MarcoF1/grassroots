const express = require('express');

const Pharmacies = require('../models/Pharmacies');

const router = express.Router();

/**
 * Get Pharmacy by location.
 * 
 * @name GET /api/pharmacies/location
 */
router.get(
  '/location', 
  [],
  async (req, res) => {
  try {
    const location = req.body.location;

    // fetch pharmacy from the DB
    let pharmacy = await Pharmacies.findOne(location);
    res.status(200).json(pharmacy).end();

  } catch (error) {
    res.status(503).json({ error: "Could not fetch pharmacy" }).end();
  }
});

/**
 * Get all Pharmacies.
 * 
 * @name GET /api/pharmacies
 */
router.get(
  '/', 
  [],
  async (req, res) => {
  try {
    // fetch all pharmacies from the DB
    let pharmacies = await Pharmacies.findAll();
    res.status(200).json(pharmacies).end();

  } catch (error) {
    res.status(503).json({ error: "Could not fetch pharmacies" }).end();
  }
});

/**
 * Create new pharmacy.
 * 
 * @name POST /api/pharmacies
 */
router.post(
  '/',
  [],
  async (req, res) => {
  try {
    const location = req.body.location;
    const vaccine = req.body.vaccine;
    
    // add pharmacy to db
    let pharmacy = await Pharmacies.addOne(location, vaccine);
    res.status(200).json(pharmacy).end();
    
  } catch (error) {
    res.status(400).json({ error: error }).end();
  }
});



module.exports = router;
