const User = require('../models/User');

const requireApiKey = async (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) return res.status(401).json({ error: 'API key required' });

  const keyData = await User.validateApiKey(apiKey);
  if (!keyData) return res.status(401).json({ error: 'Invalid API key' });

  req.userId = keyData.user_id;
  next();
};

module.exports = { requireApiKey };