import { User, Product, Purchase, CATEGORIAS  } from "./types";

export const users: User[] = [{
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

export const products: Product[] = [{
    id: '001',
    name: 'Playstation 5',
    price: 4500,
    category: CATEGORIAS.SONY
},
{
    id: '002',
    name: 'Xbox Series X',
    price: 4000,
    category: CATEGORIAS.MICROSOFT
},
{
    id: '003',
    name: 'Switch',
    price: 2500,
    category: CATEGORIAS.NINTENDO
}
]

export const purchase: Purchase[] = [{
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
]

export function createUsers(id: string, name: string, email: string, password: string) : void {
    const newUser: User = {
        id, 
        name,
        email,
        password
    }
    users.push(newUser)
    console.log('Usuário criado com sucesso')
}

export function getAllUsers(): User[] {
    return users
}


export function createProducts(id: string, name: string, price: number, category: CATEGORIAS) : void {
    const newProduct: Product = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct)
    console.log('Produto adicionado com sucesso')
}

export function getAllProducts(): Product[] {
    return products
}

export function searchById(id: string): Product[] {
    return products.filter((item) => {
        return item.id === id
    })
}

export function searchByName(name: string): Product[] {
    return products.filter((item) => {
        return item.name.toLowerCase().includes(name.toLowerCase())
    })
}

export function createPurchase(userId: string, productId: string, quantity: number, totalPrice: number) : void {
    const newPurchase: Purchase= {
        userId,
        productId,
        quantity,
        totalPrice,
    }
    purchase.push(newPurchase)
    console.log("Compra realizada com sucesso")
}

export function searchByUserId(id: string): Purchase[] {
    return purchase.filter((item) => {
        return item.userId === id
    })
}

