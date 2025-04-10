const User = require('../models/User');
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (user) return res.status(400).json({ error: 'Username already exists' });

  const userId = await User.create(username, password);
  req.session.userId = userId;
  res.status(201).json({ message: 'User registered' });
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findByUsername(username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  req.session.userId = user.id;
  res.json({ message: 'Logged in' });
};

const generateApiKey = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Login required' });
  const apiKey = await User.generateApiKey(req.session.userId);
  res.json({ api_key: apiKey });
};

const getApiKeys = async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: 'Login required' });
  const keys = await User.getApiKeys(req.session.userId);
  res.json(keys);
};

module.exports = { register, login, generateApiKey, getApiKeys };