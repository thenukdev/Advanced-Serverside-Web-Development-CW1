const express = require('express');
const router = express.Router();
const { register, login, generateApiKey, getApiKeys } = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/generate-key', generateApiKey);
router.get('/keys', getApiKeys);

module.exports = router;