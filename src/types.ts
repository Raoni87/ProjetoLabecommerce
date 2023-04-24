export enum CATEGORIAS {
    SONY = 'Sony',
    MICROSOFT = 'Microsoft',
    NINTENDO = 'Nintendo'
}

export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
}

export type Product = {
    id: string,
    name: string,
    price: number,
    category: CATEGORIAS
}

export type Purchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

