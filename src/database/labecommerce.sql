CREATE TABLE users (
    ID TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime'))
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
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

DROP TABLE products;

INSERT INTO products VALUES
("001", "Playstation 5", 4500.00, "Console Sony", "imagem"),
("002", "Playstation 4", 2500.00, "Console Sony", "imagem"),
("003", "Xbox Series X", 4000.00, "Console Microsoft", "imagem"),
("004", "Xbox Series S", 2000.00, "Console Microsoft", "imagem"),
("005", "Switch", 2500.00, "Console Nintendo", "imagem");

SELECT * FROM products;

SELECT (name) FROM products;

SELECT * FROM products WHERE NAME LIKE "%Playstation%";

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT(0),
    created_at TEXT NOT NULL DEFAULT(DATETIME('now', 'localtime')),
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users (id) on UPDATE CASCADE
);

INSERT INTO purchases (id, total_price, paid, buyer_id) VALUES
    ("p001", 4500.00, 4500.00, "001"),
    ("p002", 2500.00, 0, "002"),
    ("p003", 2000.00, 1500.00, "003");
