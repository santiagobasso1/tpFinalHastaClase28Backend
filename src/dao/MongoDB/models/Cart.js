import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";

const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products: {
        default: [],
        type: Array,
        required: true
    }
})

export class ManagerCartMongoDB extends ManagerMongoDB {
    constructor() {
        super(url, "carts", cartSchema)
        //Aqui irian los atributos propios de la clase
    }
    async delCartItems(id){
        let cart = await this.getElementById(id);
        if (cart==null){
            res.send("El carrito con el id ingresado no se encuentra");
        }else{
            cart.products=[]
            await this.updateElement(id,cart)
        }
    }

    async delItemFromCart(cid,pid){
        const cart = await this.getElementById(cid);
        const productosFiltrados = cart.products.filter((producto) => producto.productId !== pid)
        await this.updateElement(cid,{products:productosFiltrados}); //BORRA TODOS, si tiene 10 en quantity, los borra        
    }

    async addItemToCart(cid,pid){
        const cart = await this.getElementById(cid);
        if (cart.products.length>0){
            let encontrado = false;
            cart.products.forEach(producto => {
                if (producto.productId==pid){
                    producto.quantity+=1;
                    encontrado=true;
                }
            });
            if (!encontrado){
                cart.products.push({productId:pid,quantity:1})
            }
        }else{
            cart.products.push({productId:pid,quantity:1})
        }
        await this.updateElement(cid,cart);
    }
}
