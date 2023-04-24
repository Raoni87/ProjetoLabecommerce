CREATE TABLE users (
    ID TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

DROP TABLE users;

INSERT INTO users (id, name, email, password) VALUES
("001", "Raoni", "raoni@email.com", "A123456*"),
("002", "Vera", "vera@email.com", "B123456*"),
("003", "Haline", "haline@email.com", "C123456*"),
("004", "Livia", "livia@email.com","D123456*"),
("005", "Lucas", "lucas@email.com", "E123456*");

INSERT INTO users (id, name, email, password) VALUES
("006", "Rodrigo", "rodrigo@email.com", "F123456*");

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT UNIQUE NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

DROP TABLE products;

INSERT INTO products VALUES
("001", "Playstation 5", 4500.00, "SONY"),
("002", "Playstation 4", 2500.00, "SONY"),
("003", "Xbox Series X", 4000.00, "MICROSOFT"),
("004", "Xbox Series S", 2000.00, "MICROSOFT"),
("005", "Switch", 2500.00, "NINTENDO");

SELECT * FROM products;

SELECT (name) FROM products;

SELECT * FROM products WHERE NAME LIKE "%Playstation%";

