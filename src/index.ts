import express, {Request, Response} from 'express';
import cors from 'cors';
import { CATEGORIAS, Product, Purchase, User } from "./types";
import { db} from "./database/knex";

//console.log(users);
//console.log(products);
//console.log(purchase);

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
});

app.get('/users', async (req: Request, res: Response) => {
    try {
        const result = await db("users");
        res.status(200).send(result)
    } catch(error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Verfificar erro.");
        }
    }
    
});

app.get('/users/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if (!id) {
            res.status(404);
            throw new Error("Usuário não encontrado. Verificar id");
        }

        const result = await db('users').where({id:id});

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Verificar erro.');
        }
    }
})

app.post('/users', async (req: Request, res: Response) => {
    try {
    const id: string = req.body.id;
    const name: string = req.body.name;
    const email: string = req.body.email;
    const password: string = req.body.password;

    if (typeof id !== "string") {
        res.status(400);
        throw new Error("Id deve ser em string")
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

    if (
        !password.match(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
        )
    ) {
        throw new Error(
            "Password deve possuir entre 8 e 12 caractéres, utilizando letras minúsculas ou maiúsculas e pelo menos um caracter especial"
        );
    }

    const[duplicatedId]: User[] | undefined[] = await db('users').where({id});

    if (duplicatedId) {
        res.status(400);
        throw new Error('id já existe');
    }
    const [duplicatedEmail]: User[] | undefined[] = await db("users").where({email,});

    if (duplicatedEmail) {
        res.status(400);
        throw new Error("email já existe");
    }

    const newUser: User= {
        id, name, email, password
    };

    await db('users').insert(newUser);
    res
        .status(201)
        .send({message: "Usuário cadastrado com sucesso", user: newUser});

} catch (error) {
    console.log(error); 
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Verificar erro.");
        }
    

}

    // users.push(newUser);
    // console.log("Usuários", users);

    // res.status(201).send('Cadastro realizado com sucesso.')
})

app.put('/users/:id', async (req: Request, res: Response) => {
    try {const id = req.params.id as string;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newEmail = req.body.email as string | undefined;
    const newPassword = req.body.password as string | undefined;

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
  
  if(newName !== undefined){
    if (typeof newName !== "string") {
      res.status(400);
      throw new Error("name deve ser string");
    }
  
    if (newName.length < 2) {
      res.status(400);
      throw new Error("'name' deve possuir pelo menos 2 caracteres");
    }
   }
  
  if(newPassword !== undefined){
    if (
      !newPassword.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g
      )
    ) {
      throw new Error(
        "Password deve possuir entre 8 e 12 caractéres, utilizando letras minúsculas ou maiúsculas e pelo menos um caracter especial"
      );
    }
  }
  
  if(newEmail !== undefined){
    if (newEmail !== undefined) {
      if (!newEmail.includes("@")) {
        res.status(404);
        throw new Error("Formato de email incorreto. Favor verificar.");
      }
    }
  }
  
  const [user]: User[] | undefined[]= await db("users").where({id:id});
  
      if (!user) {
        res.status(404);
        throw new Error("'id' não encontrado")
      }
  
  
      const newUser: User={
        id: newId || user.id,
        name: newName || user.name,
        email: newEmail || user.email,
        password: newPassword || user.password,
      }
  
      await db("users").update(newUser).where({id:id})
      res.status(200).send({message:"Usuário editado com sucesso", user: newUser})
  
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Verificar erro.");
        }
    }

});

app.delete('/users/:id', async (req: Request, res: Response) => {
    try {
        
    const id = req.params.id as String;

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

    const [users] = await db('users').where({id:id});

    if(!users) {
        res.status(404);
        throw new Error("Id não encontrado");
    }

    await db('users').del().where({id: id})
    res.status(200).send("Usuário excluído com sucesso");

} catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
        res.status(500);
    }

    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send("Verificar erro.");
    }


}

    // const indexToRemove = users.findIndex((user) => {
    //     return user.id === id;
    // })
    
    // if(indexToRemove >=0) {
    //     users.splice(indexToRemove, 1);
    // }
    // res.status(200).send("Usuário apagado com sucesso");
});

app.get('/products', async (req: Request, res: Response) => {
    try {
        const result = await db("Products");
        res.status(200).send(result);
} catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
        res.status(500);
    }

    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send("Verificar erro.");
    }
}
});

app.get('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(!id) {
            res.status(404);
            throw new Error('Produto não encontrado');
        }

        const result = await db('products').where({id:id});

        res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Verificar erro.');
        }
    }
})

app.get('/products/search', async (req: Request, res: Response) => {                
    
    try {
        const name = req.query.name as string;

        const [filterProducts] = await db("products").where({name: name});

        if (!name) {
            res.status(404);
            throw new Error("Insira ao menos um caracter.");
        }

        res.status(200).send(filterProducts);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Verificar erro.");
        }
    }
})

app.post('/products', async (req: Request, res: Response) => {
    try {
    
        const id: string = req.body.id;
    const name: string = req.body.name;
    const price: number = req.body.price;
    const category: CATEGORIAS = req.body.category;

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

    const [duplicatedProductId]: Product [] | undefined[] = await db('products').where({id, });

    if (duplicatedProductId)
    {
        res.status(400);
        throw new Error('Id do produto já existe');
    }
    const newProduct: Product = {
        id, name, price, category
    };

    await db('products').insert(newProduct);
    res
        .status(201)
        .send({message: "Produto cadastrado com sucesso", product: newProduct});

    // products.push(newProduct);
    // console.log("Produtos", products);

    // res.status(201).send('Produto cadastrado com sucesso.')
} catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
        res.status(500);
    }

    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send("Verificar erro");
    }
}
});

app.put('/products/:id', async (req: Request, res: Response) => {
    try {
        
    const id = req.params.id as string;

    if(!id) {
        res.status(400);
        throw new Error('id não encontrado');
    }

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newCategory = req.body.category as CATEGORIAS | undefined;

    if (newId !== undefined) {
        if (typeof newId !== 'string') {
            res.status(404);
            throw new Error ('id deve ser uma string');
        }
        if (newId.length < 3) {
            res.status(404);
            throw new Error ('Id deve ter pelo menos 3 caracteres');
        }

        if(newName !== undefined) {
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

    const [product]: Product[] | undefined[] = await db('products').where({id:id})

    if(!product) {
        res.status(404);
        throw new Error('Id não encontrado');
    }

    const newProduct: Product={
        id: newId || product.id,
        name: newName || product.name,
        price: newPrice || product.price,
        category: newCategory || product.category
    }

    await db('products').update(newProduct).where({id:id});
    res.status(200).send({message: "Produto editado com sucesso", product: newProduct});
 
    // const product = products.find((product) => {
    //     return product.id === id;
    // })

    // if(product) {
    //     product.id = newId || product.id;
    //     product.name = newName || product.name;
    //     product.price = newPrice || product.price;
    //     product.category = newCategory || product.category
    // }

    // res.status(200).send("Produto atualizado com sucesso");

} catch(error) {
    console.log(error);
    if (res.statusCode === 200) {
        res.status(500);
    }

    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send("Verificar erro.");
    }
}
});

app.delete('/products/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;

        if(id !== undefined) {
            if (typeof id !== 'string') {
                res.status(400);
                throw new Error ('Id deve ser uma string');
            }
        }

        const [product] = await db('products').where({id:id})

        if(!product){
            res.status(404);
            throw new Error('Id não encontrado');
        }

        await db("products").del().where({id:id})
        res.status(200).send("Produto excluído com sucesso");

    } catch(error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send("Verificar erro");
        }
    }
})

app.get('/purchase', async (req: Request, res: Response) => {
    try {
        const result = await db('purchase');
        res.status(200).send(result);

    // app.get('/products/:id/purchases', (req: Request, res: Response) => {
//     const id = req.params.id as string;


//     res.status(200).send("Compras do usuário:", )
// })
} catch (error) {
    console.log(error);
    if (res.statusCode === 200) {
        res.status(500);
    }

    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send('Verificar error');
    }
}
})

app.get('/purchase/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        
        const filteredPurchase = await db
        .select('*')
        .from('purchases')
        .where({id:id});

        console.log(filteredPurchase);

        if(!filteredPurchase) {
            res.status(404);
            throw new Error('Id não encontrado');
            }

            const result =  await db('purchases').where({id:id});

            res.status(200).send(result);
    } catch (error) {
        console.log(error);
        if (res.statusCode === 200) {
            res.status(500);
        }

        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.send('Verificar erro.');
        }
    }
})

app.post('/purchase', async (req: Request, res: Response) => {
    try{
    
    const userId: string = req.body.userId as string;
    const productId: string = req.body.productId as string;
    const quantity: number = req.body.quantity as number;
    const totalPrice: number = req.body.totalPrice as number;

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

    const newPurchase: Purchase = {
        userId, productId, quantity, totalPrice
    };

    await db('purchase').insert(newPurchase);

    const [insertPurchase]: Purchase[] = await db('purchase').where({userId});

    res.status(201).send({
        message: "Purchase criada com sucesso",
        purchase: insertPurchase,
    });

    const [duplicatedPurchase]: Purchase[] | undefined[] = await db('purchase').where({userId});
    
    if(duplicatedPurchase) {
        res.status(400);
        throw new Error('Id de compra já existe');
    }

    // purchase.push(newPurchase)
    // console.log("Compra", purchase)

    // res.status(201).send('Compra realizada com sucesso.')
} catch(error) {
    console.log(error);
    if( res.statusCode === 200) {
        res.status(500);
    } 
    
    if (error instanceof Error) {
        res.send(error.message);
    } else {
        res.send('Verificar erro');
    }
}
}
);



function Separador(): void {
    console.log('='.repeat(70))
};



// createUsers('Haline', 'haline@email.com', '1324');
// Separador()
// console.log(users);

// createProducts('003', 'batata', 3, CATEGORIAS.LEGUMES);
// Separador()
// console.log(products);
// Separador()

// console.log(getAllProducts);
// Separador()

// console.log(searchById('001'));
// Separador()

// console.log(searchByName('banana'));
// Separador()

// createPurchase('Raoni', '002', 3, 9)
// Separador()

// console.log(purchase);
// Separador()

// console.log(searchByUserId('Raoni'));
// Separador()