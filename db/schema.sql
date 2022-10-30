DROP DATABASE IF EXISTS departments_db;
CREATE DATABASE departments_db;

USE departments_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
);