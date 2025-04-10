const pool = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const User = {
  async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
      'INSERT INTO users (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  },

  async findByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
  },

  async generateApiKey(userId) {
    const apiKey = uuidv4();
    await pool.query(
      'INSERT INTO api_keys (user_id, api_key, requests_count) VALUES (?, ?, 0)',
      [userId, apiKey]
    );
    return apiKey;
  },

  async getApiKeys(userId) {
    const [rows] = await pool.query('SELECT api_key, requests_count FROM api_keys WHERE user_id = ?', [userId]);
    return rows;
  },

  async validateApiKey(apiKey) {
    const [rows] = await pool.query('SELECT * FROM api_keys WHERE api_key = ?', [apiKey]);
    if (rows.length > 0) {
      await pool.query('UPDATE api_keys SET requests_count = requests_count + 1 WHERE api_key = ?', [apiKey]);
      return rows[0];
    }
    return null;
  }
};

module.exports = User;