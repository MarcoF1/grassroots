const express = require('express');

const Bills = require('../models/Bills');
const { findAll } = require('../models/Governments');
const v = require('./validators');

const router = express.Router();

/**
 * Create new bill.
 * 
 * @name POST /api/bills
 * @param {string} government_id 
 * @param {string} name 
 * @param {string} description 
 * @param {string} closing_date 
 * 
 */
router.post(
    '/',
    [
    ],
    async (req, res) => {
    try {
        const user_id = req.session.user_id;
        const username = req.session.username;
        const government_id = req.body.government_id;
        const name = req.body.name;
        const description = req.body.description;
        const closing_date = req.body.closing_date;
        
        let bill = await Bills.addOne(government_id, name, description, closing_date);

        res.status(201).json({message: "Succesfully added bill!" , bill}).end();
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to add bill" }).end();
    }
  });

  /**
 * Update bill
 * 
 * @name PUT /api/bills/
 * @param {string} name 
 * @param {string} description 
 * @param {string} closing_date 
 * @param {Bill} old_bill
 */
router.put(
    '/',
    [],
    async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let closing_date = req.body.closing_date;
        let bill_status = req.body.bill_status;
        let bill_id = req.body.bill_id;

        let updated = await Bills.updateOne(name, description, closing_date, bill_status, bill_id)
        
        res.status(201).json({message: "Succesfully updated a bill!"}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to updated bill" }).end();
    }
});

/**
 * Remove bill
 * 
 * @name DELETE /api/bills/:bill_id'
 * @param {number} bill_id 
 */
router.delete(
    '/:bill_id',
    [],
    async (req, res) => {
    try {
        let bill_id = req.params.bill_id;
        await Bills.deleteOne(bill_id)
        res.status(201).json({message: "Succesfully deleted bill"}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to delete bill" }).end();
    }
});

/**
 * Get all bills
 * 
 * @name GET /api/bills
 */
router.get(
    '/',
    [
    ],
    async (req, res) => {
    try {
        let bills = await Bills.findAll();
        res.status(201).json({bills}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get bill" }).end();
    }
  });


/**
 * Get bill with bill_id
 * 
 * @name GET /api/bills/id/:bill_id
 */
router.get(
    '/id/:bill_id',
    [],
    async (req, res) => {
    try {
        let bill = await Bills.findByID(req.params.bill_id);
        res.status(201).json({bill}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get bill" }).end();
    }
});

/**
 * Get bills from government_id
 * 
 * @name GET /api/bills/gov/:government_id
 */
router.get(
    '/gov/:government_id',
    [],
    async (req, res) => {
    try {
        let bills = await Bills.findByGovernmentID(req.params.government_id);
        res.status(201).json({bills}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get bill" }).end();
    }
});


module.exports = router;
