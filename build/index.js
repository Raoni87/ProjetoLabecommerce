"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const knex_1 = require("./database/knex");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("users");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verfificar erro.");
        }
    }
}));
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(404);
            throw new Error("Usuário não encontrado. Verificar id");
        }
        const result = yield (0, knex_1.db)('users').where({ id: id });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send('Verificar erro.');
        }
    }
}));
app.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        if (typeof id !== "string") {
            res.status(400);
            throw new Error("Id deve ser em string");
        }
        if (id.length < 3) {
            res.status(400);
            throw new Error("Id deve possuir pelo menos 3 caracteres");
        }
        if (typeof name !== 'string') {
            res.status(400);
            throw new Error("Name deve ser uma string");
        }
        if (name.length < 2) {
            res.status(400);
            throw new Error("Name deve possuir pelo menos 2 caracteres");
        }
        if (typeof email !== 'string') {
            res.status(400);
            throw new Error("email deve ser uma string");
        }
        if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
            throw new Error("Password deve possuir entre 8 e 12 caractéres, utilizando letras minúsculas ou maiúsculas e pelo menos um caracter especial");
        }
        const [duplicatedId] = yield (0, knex_1.db)('users').where({ id });
        if (duplicatedId) {
            res.status(400);
            throw new Error('id já existe');
        }
        const [duplicatedEmail] = yield (0, knex_1.db)("users").where({ email, });
        if (duplicatedEmail) {
            res.status(400);
            throw new Error("email já existe");
        }
        const newUser = {
            id, name, email, password
        };
        yield (0, knex_1.db)('users').insert(newUser);
        res
            .status(201)
            .send({ message: "Usuário cadastrado com sucesso", user: newUser });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.put('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const newId = req.body.id;
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                res.status(400);
                throw new Error("'id' deve ser string");
            }
            if (newId.length < 3) {
                res.status(400);
                throw new Error("Id deve possuir pelo menos 3 caracteres");
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                res.status(400);
                throw new Error("name deve ser string");
            }
            if (newName.length < 2) {
                res.status(400);
                throw new Error("'name' deve possuir pelo menos 2 caracteres");
            }
        }
        if (newPassword !== undefined) {
            if (!newPassword.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g)) {
                throw new Error("Password deve possuir entre 8 e 12 caractéres, utilizando letras minúsculas ou maiúsculas e pelo menos um caracter especial");
            }
        }
        if (newEmail !== undefined) {
            if (newEmail !== undefined) {
                if (!newEmail.includes("@")) {
                    res.status(404);
                    throw new Error("Formato de email incorreto. Favor verificar.");
                }
            }
        }
        const [user] = yield (0, knex_1.db)("users").where({ id: id });
        if (!user) {
            res.status(404);
            throw new Error("'id' não encontrado");
        }
        const newUser = {
            id: newId || user.id,
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password,
        };
        yield (0, knex_1.db)("users").update(newUser).where({ id: id });
        res.status(200).send({ message: "Usuário editado com sucesso", user: newUser });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.delete('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("id deve ser uma string");
            }
            if (id.length < 3) {
                res.status(400);
                throw new Error("id deve ter pelo menos 3 caracteres");
            }
        }
        const [users] = yield (0, knex_1.db)('users').where({ id: id });
        if (!users) {
            res.status(404);
            throw new Error("Id não encontrado");
        }
        yield (0, knex_1.db)('users').del().where({ id: id });
        res.status(200).send("Usuário excluído com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)("Products");
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.get('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(404);
            throw new Error('Produto não encontrado');
        }
        const result = yield (0, knex_1.db)('products').where({ id: id });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send('Verificar erro.');
        }
    }
}));
app.get('/products/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.query.name;
        const [filterProducts] = yield (0, knex_1.db)("products").where({ name: name });
        if (!name) {
            res.status(404);
            throw new Error("Insira ao menos um caracter.");
        }
        res.status(200).send(filterProducts);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        if (typeof id !== 'string') {
            res.status(400);
            throw new Error("Id deve ser uma string");
        }
        if (id.length < 3) {
            res.status(400);
            throw new Error('Id deve possuir pelo menos 3 caracteres');
        }
        if (typeof name !== 'string') {
            res.status(400);
            throw new Error('Name deve ser uma string');
        }
        if (typeof price !== "number") {
            res.status(400);
            throw new Error('price deve ser um number');
        }
        const [duplicatedProductId] = yield (0, knex_1.db)('products').where({ id, });
        if (duplicatedProductId) {
            res.status(400);
            throw new Error('Id do produto já existe');
        }
        const newProduct = {
            id, name, price, category
        };
        yield (0, knex_1.db)('products').insert(newProduct);
        res
            .status(201)
            .send({ message: "Produto cadastrado com sucesso", product: newProduct });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro");
        }
    }
}));
app.put('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(400);
            throw new Error('id não encontrado');
        }
        const newId = req.body.id;
        const newName = req.body.name;
        const newPrice = req.body.price;
        const newCategory = req.body.category;
        if (newId !== undefined) {
            if (typeof newId !== 'string') {
                res.status(404);
                throw new Error('id deve ser uma string');
            }
            if (newId.length < 3) {
                res.status(404);
                throw new Error('Id deve ter pelo menos 3 caracteres');
            }
            if (newName !== undefined) {
                if (typeof newName !== 'string') {
                    res.status(404);
                    throw new Error('name deve ser uma string');
                }
            }
            if (newPrice !== undefined) {
                if (typeof newPrice !== 'number') {
                    res.status(404);
                    throw new Error('Price de ser um number');
                }
            }
            if (newCategory !== undefined) {
                if (typeof newCategory !== 'string') {
                    res.status(404);
                    throw new Error('Category deve ser uma string');
                }
            }
        }
        const [product] = yield (0, knex_1.db)('products').where({ id: id });
        if (!product) {
            res.status(404);
            throw new Error('Id não encontrado');
        }
        const newProduct = {
            id: newId || product.id,
            name: newName || product.name,
            price: newPrice || product.price,
            category: newCategory || product.category
        };
        yield (0, knex_1.db)('products').update(newProduct).where({ id: id });
        res.status(200).send({ message: "Produto editado com sucesso", product: newProduct });
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro.");
        }
    }
}));
app.delete('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id !== undefined) {
            if (typeof id !== 'string') {
                res.status(400);
                throw new Error('Id deve ser uma string');
            }
        }
        const [product] = yield (0, knex_1.db)('products').where({ id: id });
        if (!product) {
            res.status(404);
            throw new Error('Id não encontrado');
        }
        yield (0, knex_1.db)("products").del().where({ id: id });
        res.status(200).send("Produto excluído com sucesso");
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send("Verificar erro");
        }
    }
}));
app.get('/purchase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, knex_1.db)('purchase');
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send('Verificar error');
        }
    }
}));
app.get('/purchase/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const filteredPurchase = yield knex_1.db
            .select('*')
            .from('purchases')
            .where({ id: id });
        console.log(filteredPurchase);
        if (!filteredPurchase) {
            res.status(404);
            throw new Error('Id não encontrado');
        }
        const result = yield (0, knex_1.db)('purchases').where({ id: id });
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send('Verificar erro.');
        }
    }
}));
app.post('/purchase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        if (userId !== undefined) {
            if (typeof userId !== 'string') {
                res.status(400);
                throw new Error('userId deve ser uma string');
            }
            if (userId.length < 3) {
                res.status(400);
                throw new Error('userId deve ter pelo menos 3 caracteres');
            }
            if (typeof quantity !== 'number') {
                res.status(400);
                throw new Error('Quantity deve ser um number');
            }
            if (quantity < 1) {
                res.status(400);
                throw new Error('Quantidade deve ser igual ou maior a 1');
            }
        }
        const newPurchase = {
            userId, productId, quantity, totalPrice
        };
        yield (0, knex_1.db)('purchase').insert(newPurchase);
        const [insertPurchase] = yield (0, knex_1.db)('purchase').where({ userId });
        res.status(201).send({
            message: "Purchase criada com sucesso",
            purchase: insertPurchase,
        });
        const [duplicatedPurchase] = yield (0, knex_1.db)('purchase').where({ userId });
        if (duplicatedPurchase) {
            res.status(400);
            throw new Error('Id de compra já existe');
        }
    }
    catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        }
        else {
            res.send('Verificar erro');
        }
    }
}));
function Separador() {
    console.log('='.repeat(70));
}
;
//# sourceMappingURL=index.js.map