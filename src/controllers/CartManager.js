import { Console } from "console";
import fs from "fs";



class Cart {
    constructor(id, products) {
        this.id = id;
        this.products = products;
    }
}

export class CartManager {
    constructor(path) {
        this.path = path;
        this.carritos = [];
    }
    checkArchivo = () => {
        return fs.existsSync(this.path)
    }
    crearArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")
    }
    crearCarritoVacio = async () => {
        let contenido = await fs.promises.readFile(this.path, "utf-8");
        let aux = JSON.parse(contenido);
        if (aux.length > 0) {
            const idAutoincremental = aux[aux.length - 1].id + 1; //Esto para que sea incremental dependiendo del ultimo elemento
            let carrito = new Cart(idAutoincremental, []);
            aux.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
        } else {
            const idAutoincremental = 1;
            let carrito = new Cart(idAutoincremental, []);
            aux.push(carrito)
            await fs.promises.writeFile(this.path, JSON.stringify(aux));
        }
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile("src/models/products.json", 'utf-8')  
        let aux = JSON.parse(contenido)
        let valor=false;
        if(aux.some(product=> product.id === id)) 
        {
            valor=true;        
        }else{
            valor=false;
        }        
        return valor;
    }

    addProductToCart = async (idCart,idProduct, quantity) => {
        let contenido = await fs.promises.readFile(this.path, "utf-8");
        let carritos = JSON.parse(contenido);
        let index = carritos.findIndex(cart => cart.id ===idCart);
        const existe = await this.getProductById(idProduct)
        if(carritos[index]){
            if (existe){
                let aux = carritos[idCart-1].products;
                let index = aux.findIndex(product => product.idProduct ===idProduct);
        
                if (index!=-1){
                    carritos[idCart-1].products[index].quantity+=quantity;
                }else{
                    carritos[idCart-1].products.push({idProduct,quantity});
                }
                await fs.promises.writeFile(this.path, JSON.stringify(carritos));                
            }else{
                console.error("No existe un producto con el id: "+idProduct)
            }

        }else{
            console.error("No se encuentra el carrito")
        }
      

    }

    getAllCartProducts= async(idCart)=> {
        if (this.checkArchivo()){
            
            
            let contenido = await fs.promises.readFile(this.path, 'utf-8')  
            let arrayCarritos = JSON.parse(contenido);
            let index = arrayCarritos.findIndex(cart => cart.id ===idCart);

            if (arrayCarritos[index]){
                let aux = JSON.parse(contenido)     
                let carrito = aux.find(carritos => carritos.id===idCart)   
                if (carrito.products.length>0){
                    return carrito.products
                }else
                {
                    return "No existen productos en este carrito"
                }
            }else{
                return "No existe el carrito"
            }

        }else{
            return "No existe el archivo"
        }
       
    }
}


// const manager = new CartManager("../models/carts.json");

// const tests = async ()=>{
//     await manager.crearArchivo();
//     await manager.crearCarritoVacio(); 
//     await manager.crearCarritoVacio(); 

//     await manager.crearCarritoVacio(); 

//     await manager.crearCarritoVacio(); 
//     await manager.crearCarritoVacio(); 
//     await manager.crearCarritoVacio(); 
//     await manager.crearCarritoVacio(); 
//     await manager.addProductToCart(1,1,2);
//     await manager.addProductToCart(1,9,60);
//     await manager.addProductToCart(1,2,60);
//     console.log(await manager.getAllCartProducts(1))

//     // console.log(await manager.getAllCartProducts(1));


// }

// tests();