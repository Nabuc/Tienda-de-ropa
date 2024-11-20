CREATE DATABASE crud_admin;
USE crud_admin;

CREATE TABLE productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    talla VARCHAR(100) NOT NULL,
    imagen VARCHAR(255) DEFAULT NULL
);
