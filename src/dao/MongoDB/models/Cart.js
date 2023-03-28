import { ManagerMongoDB } from "../../../db/mongoDBManager.js";
import { Schema } from "mongoose";
import productManager from "../../ManagersGeneration/productManager.js";




const url = process.env.URLMONGODB

const cartSchema = new Schema({
    products:{
        type:[{
            productId:{
                type: Schema.Types.ObjectId,
                ref: "products",
            },
            quantity:{
                type:Number,
                default:1
            }
        }],
        default:[]
    }
})

export class cartManagerMongoDB extends ManagerMongoDB {
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
        let existe = false;
        cart.products.forEach(producto=>{
            if (producto.productId == pid){
                existe=true;
            }
        })
        if (existe){
            const productosFiltrados = cart.products.filter((producto) => producto.productId != pid)
            await this.updateElement(cid,{products:productosFiltrados});   
            return "Producto eliminado" 
        }else
        {
            return "El producto no se encuentra"
        }

    }

    async addItemToCart(cid,pid){
        try{
            const cart = await this.getElementById(cid);
            const product = await productManager.getElementById(pid);
            const prodIndex = cart.products.findIndex(product => product.productId.equals(pid));
            if (product==undefined){
                return "El producto no existe"
            }else
            {
                if (product.stock>2){
                    if (prodIndex==-1){
                        cart.products.push({productId:pid});
                        product.stock-=1;
                    }else{
                        cart.products[prodIndex].quantity+=1;
                        product.stock-=1;
                    }
                    await product.save();
                    await cart.save();
                    return cart;
                }
            }

        }catch(error){
            return "Problema al agregar el producto"
        }

    }

    async updateAllCartItems(cid, productos){
        const cart = await this.getElementById(cid);
        const productosParaActualizar = await Promise.all(productos.map(async (producto) => {
            let productOnDB = await productManager.getElementById(producto.productId)
            if (producto.quantity < productOnDB.stock){
                productOnDB.stock-=producto.quantity;
                productOnDB.save();
                return producto;
            } else {
                console.log("No se puede ingresar un producto que no tiene stock suficiente")
                return null;
            }
        }));
        const productosValidos = productosParaActualizar.filter(p => p !== null);
        console.log(productosValidos);
        cart.products = productosValidos;
        cart.save();
        return "Carrito Actualizado Completamente"
    }

    async updateCartItem(cid,pid,quantity){
        let producto = await productManager.getElementById(pid)
        if (producto.stock>quantity){
            let cart=await this.getElementById(cid);
            cart.products.forEach(producto => {
                if (producto.productId==pid){
                    producto.quantity=quantity;
                }
            });
            cart.save();
            return "Cantidad de compra actualizada"
        }else{
            return "No se puede agregar mas items que el stock disponible"
        }

    }
}
