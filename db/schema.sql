CREATE DATABASE IF NOT EXISTS dbName;

USE dbName;

CREATE TABLE IF NOT EXISTS tbl (
    id INT AUTO_INCREMENT,
    email VARCHAR(35) NOT NULL,
    password VARCHAR(60) NOT NULL,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    latitude DECIMAL(10,7),
    longitude DECIMAL(10,7),
    status VARCHAR(35) NOT NULL DEFAULT 'active',
    PRIMARY KEY (id)
);