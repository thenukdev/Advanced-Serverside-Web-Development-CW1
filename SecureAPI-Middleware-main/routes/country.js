const express = require('express');
const router = express.Router();
const { getCountries } = require('../controllers/country'); // Importing getCountries
const { requireApiKey } = require('../middleware/auth');

router.get('/countries', requireApiKey, getCountries); // Line 6

module.exports = router;