const express = require('express');
const router = express.Router();

const Governments = require('../models/Governments');

/**
 * Add new government
 * 
 * @name POST /api/government/
 * @param {string} name 
 * @param {string} description 
 */
router.post(
    '/',
    [],
    async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        
        let added = await Governments.addOne(name, description)
        
        res.status(201).json({message: "Succesfully added a government!"}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to add government" }).end();
    }
});

/**
 * Get government with id
 * 
 * @name GET /api/government/:id
 * @param {number} government_id 
 */
router.get(
    '/id/:government_id',
    [],
    async (req, res) => {
    try {
        let government_id = req.params.government_id;
        let government = await Governments.findByID(government_id);
        res.status(201).json({government}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get government" }).end();
    }
});

/**
 * Get all governments
 * 
 * @name GET /api/government
 */
router.get(
    '/',
    [],
    async (req, res) => {
    try {
        let governments = await Governments.findAll()
        
        res.status(201).json({governments}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get governments" }).end();
    }
});

/**
 * Get users governments
 * 
 * @name GET /api/government
 * @param {number} user_id 
 */
router.get(
    '/my',
    [],
    async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let userGovernments = await Governments.userGovernments(user_id)
        let myGovIDs = userGovernments.map( gov => gov.government_id).filter((v, i, a) => a.indexOf(v) === i);
        let governments = []
        for( let i = 0 ; i < myGovIDs.length ; i ++) {
            governments.push(await Governments.findByID(myGovIDs[i]))
        }
        res.status(201).json({governments}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get governments" }).end();
    }
});


/**
 * Join new government
 * 
 * @name POST /api/governments/join
 * @param {number} government_id 
 * @param {number} user_id 
 */
router.post(
    '/join',
    [],
    async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let government_id = req.body.government_id;
        await Governments.addUser(government_id, user_id)
        res.status(201).json({message: "Succesfully added user to government " + government_id}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to add user" }).end();
    }
});

/**
 * Join new government
 * 
 * @name DELETE /api/governments/leave:government_id'
 * @param {number} government_id 
 * @param {number} user_id 
 */
router.delete(
    '/leave/:government_id',
    [],
    async (req, res) => {
    try {
        let user_id = req.session.user_id;
        let government_id = req.params.government_id;
        await Governments.removeUser(government_id, user_id)
        res.status(201).json({message: "Succesfully removed user from government " + government_id}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to remove user" }).end();
    }
});


module.exports = router;
