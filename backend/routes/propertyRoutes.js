const express = require('express');
const Property = require('../models/Property');

const router = express.Router();

// Fetch all properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
