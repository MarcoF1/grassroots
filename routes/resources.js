const express = require('express');

const Resources = require('../models/Resources');
const v = require('./validators');

const router = express.Router();

/**
 * Create new resource.
 * 
 * @name POST /api/resources
 * @param {string} government_id 
 * @param {string} name 
 * @param {string} description 
 * @param {string} url 
 * 
 */
router.post(
    '/',
    [
        v.ensureUserLoggedIn,
        v.ensureValidGovernmentInBody,
        v.ensureValidNameInBody,
        v.ensureValidDescriptionInBody,
        v.ensureValidURLInBody
    ],
    async (req, res) => {
    try {
        const government_id = req.body.government_id;
        const name = req.body.name;
        const description = req.body.description;
        const url = req.body.url;
        
        let resource = await Resources.addOne(government_id, url, name, description);

        res.status(201).json({message: "Succesfully added resource!" , resource}).end();
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to add resource" }).end();
    }
  });

  /**
 * Update resource
 * 
 * @name PUT /api/resources/
 * @param {string} name 
 * @param {string} description 
 * @param {string} url 
 * @param {Resource} resource_id
 */
router.put(
    '/',
    [
        v.ensureUserLoggedIn,
        v.ensureValidNameInBody,
        v.ensureValidDescriptionInBody,
        v.ensureValidURLInBody
    ],
    async (req, res) => {
    try {
        let name = req.body.name;
        let description = req.body.description;
        let url = req.body.url;
        let resource_id = req.body.resource_id;

        let updated = await Resources.updateOne(name, description, url, resource_id) 
        
        res.status(201).json({message: "Succesfully updated a resource!"}).end();
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to updated resource" }).end();
    }
});

/**
 * Remove resource
 * 
 * @name DELETE /api/resources/:resource_id'
 * @param {number} resource_id 
 */
router.delete(
    '/:resource_id',
    [

    ],
    async (req, res) => {
    try {
        let resource_id = req.params.resource_id;
        await Resources.deleteOne(resource_id)
        res.status(201).json({message: "Succesfully deleted resource"}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to delete resource" }).end();
    }
});


/**
 * Get resource with resource_id
 * 
 * @name GET /api/resources/id/:resource_id
 */
router.get(
    '/id/:resource_id',
    [],
    async (req, res) => {
    try {
        let resource = await Resources.findByID(req.params.resource_id);
        res.status(201).json({resource}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get resource" }).end();
    }
});

/**
 * Get resources from government_id
 * 
 * @name GET /api/resources/gov/:government_id
 */
router.get(
    '/gov/:government_id',
    [],
    async (req, res) => {
    try {
        let resources = await Resources.findByGovernmentID(req.params.government_id);
        res.status(201).json({resources}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get resource" }).end();
    }
});


module.exports = router;
