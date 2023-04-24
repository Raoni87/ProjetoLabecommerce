"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByUserId = exports.createPurchase = exports.searchByName = exports.searchById = exports.getAllProducts = exports.createProducts = exports.getAllUsers = exports.createUsers = exports.purchase = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [{
        id: '001',
        name: 'Raoni Salgado Marques',
        email: 'raoni@mail.com',
        password: '1234'
    },
    {
        id: '002',
        name: 'Vera Lúcia Salgado Marques',
        email: 'vera@email.com',
        password: '4321'
    }
];
exports.products = [{
        id: '001',
        name: 'Playstation 5',
        price: 4500,
        category: types_1.CATEGORIAS.SONY
    },
    {
        id: '002',
        name: 'Xbox Series X',
        price: 4000,
        category: types_1.CATEGORIAS.MICROSOFT
    },
    {
        id: '003',
        name: 'Switch',
        price: 2500,
        category: types_1.CATEGORIAS.NINTENDO
    }
];
exports.purchase = [{
        userId: 'Raoni',
        productId: '001',
        quantity: 1,
        totalPrice: 4500
    },
    {
        userId: 'Vera',
        productId: '002',
        quantity: 1,
        totalPrice: 4000
    }
];
function createUsers(id, name, email, password) {
    const newUser = {
        id,
        name,
        email,
        password
    };
    exports.users.push(newUser);
    console.log('Usuário criado com sucesso');
}
exports.createUsers = createUsers;
function getAllUsers() {
    return exports.users;
}
exports.getAllUsers = getAllUsers;
function createProducts(id, name, price, category) {
    const newProduct = {
        id,
        name,
        price,
        category
    };
    exports.products.push(newProduct);
    console.log('Produto adicionado com sucesso');
}
exports.createProducts = createProducts;
function getAllProducts() {
    return exports.products;
}
exports.getAllProducts = getAllProducts;
function searchById(id) {
    return exports.products.filter((item) => {
        return item.id === id;
    });
}
exports.searchById = searchById;
function searchByName(name) {
    return exports.products.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase());
    });
}
exports.searchByName = searchByName;
function createPurchase(userId, productId, quantity, totalPrice) {
    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice,
    };
    exports.purchase.push(newPurchase);
    console.log("Compra realizada com sucesso");
}
exports.createPurchase = createPurchase;
function searchByUserId(id) {
    return exports.purchase.filter((item) => {
        return item.userId === id;
    });
}
exports.searchByUserId = searchByUserId;
//# sourceMappingURL=database.js.map