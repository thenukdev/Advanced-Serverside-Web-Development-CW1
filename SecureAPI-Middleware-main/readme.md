npm install express mysql2 bcrypt jsonwebtoken axios dotenv cors helmet express-rate-limit

CREATE DATABASE country_api;
USE country_api;
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);
CREATE TABLE api_keys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  api_key VARCHAR(255) UNIQUE NOT NULL,
  requests_count INT DEFAULT 0,
  FOREIGN KEY (user_id) REFERENCES users(id)
);