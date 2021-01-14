const express = require('express');
const router = express.Router();

const districts = [
    {
        id: "1",
        name: "NY 14th District - Bronx"
    },
    {
        id: "2",
        name: "UA MIT"
    },
    {
        id: "3",
        name: "TX 30th District - Dallas"
    }
]

/**
 * Get district with id
 * 
 * @name GET /api/district/:id
 */
router.get(
    '/:id',
    [],
    async (req, res) => {
    try {
        let district = districts.filter( district => district.id === req.params.id)[0]
        res.status(201).json({district}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get district" }).end();
    }
});

/**
 * Get all districts
 * 
 * @name GET /api/district
 */
router.get(
    '/',
    [],
    async (req, res) => {
    try {
        res.status(201).json({districts}).end();
    } catch (error) {
        res.status(400).json({ error: "Failed to get districts" }).end();
    }
});


module.exports = router;
