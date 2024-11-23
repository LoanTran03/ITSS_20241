-- Create the database
CREATE DATABASE IF NOT EXISTS AccountDB;

-- Use the database
USE AccountDB;

-- Create the accounts table
CREATE TABLE IF NOT EXISTS accounts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert a sample account
INSERT INTO accounts (username, password, email) 
VALUES ('testuser', 'password123', 'testuser@example.com');

-- Select all accounts
SELECT * FROM accounts;