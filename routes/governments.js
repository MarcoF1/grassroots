const express = require('express');
const router = express.Router();

const Governments = require('../models/Governments');
const Users = require('../models/Users');
const Bills = require('../models/Bills');


/**
 * Add new government
 * 
 * @name POST /api/governments/
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
        let contact = req.body.contact;
        let address = req.body.address;
        let user_id = req.session.user_id;
        
        let added = await Governments.addOne(name, description, contact, address, user_id)
        
        res.status(201).json({message: "Succesfully added a government!"}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to add government" }).end();
    }
});

/**
 * Update government
 * 
 * @name PUT /api/governments/
 * @param {string} name 
 * @param {string} description 
 * @param {string} address 
 * @param {string} contact 
 * @param {Government} old_gov
 */
router.put(
    '/',
    [],
    async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let contact = req.body.contact;
        let address = req.body.address;
        let old_gov = req.body.old_gov;
        
        let updated = await Governments.updateOne(name, description, contact, address, old_gov)
        
        res.status(201).json({message: "Succesfully updated a government!"}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to updated government" }).end();
    }
});

/**
 * Remove government
 * 
 * @name DELETE /api/governments/:government_id'
 * @param {number} government_id 
 */
router.delete(
    '/:government_id',
    [],
    async (req, res) => {
    try {
        let government_id = req.params.government_id;
        await Governments.deleteOne(government_id)
        res.status(201).json({message: "Succesfully deleted government"}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to delete government" }).end();
    }
});

/**
 * Get government with id
 * 
 * @name GET /api/governments/:id
 * @param {number} government_id 
 */
router.get(
    '/id/:government_id',
    [],
    async (req, res) => {
    try {
        let government_id = req.params.government_id;
        let government = await Governments.findByID(government_id);
        government.users = await Governments.governmentUsers(government.government_id);
        for(let i =0 ; i < government.users.length ; i++) {
            let user = government.users[i];
            let full_user = await Users.findByID(user.user_id)
            government.users[i].username = full_user.username;
        }
        government.reps = await government.users.filter( user => user.is_rep == 'true');
        government.bills = await Bills.findByGovernmentID(government_id)
        res.status(201).json({government}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get government" }).end();
    }
});

/**
 * Get all governments
 * 
 * @name GET /api/governments
 */
router.get(
    '/',
    [],
    async (req, res) => {
    try {
        let governments = await Governments.findAll()
        for(let i = 0 ; i < governments.length ; i ++){
            let gov = governments[i]
            gov.users = await Governments.governmentUsers(gov.government_id);
            gov.reps = await gov.users.filter( user => user.is_rep == 'true');
        }
        res.status(201).json({governments}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to get governments" }).end();
    }
});

/**
 * Get users governments
 * 
 * @name GET /api/governments
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
        for(let i = 0 ; i < governments.length ; i ++){
            let gov = governments[i]
            gov.users = await Governments.governmentUsers(gov.government_id);
            gov.reps = await gov.users.filter( user => user.is_rep == 'true');
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
