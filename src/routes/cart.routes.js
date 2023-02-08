import { Router } from "express";
const routerCart = Router();
import {CartManager} from "../controllers/CartManager.js"
const manager = new CartManager('src/models/carts.json');



routerCart.post("/", async (req, res) => {
    if (!manager.checkArchivo()){
        await manager.crearArchivo();
    }
    await manager.crearCarritoVacio()
    res.send("Carrito creado")
});

routerCart.get("/:cid", async (req, res) => {
    const productos=await manager.getAllCartProducts(parseInt(req.params.cid))
    res.send(productos)
});




routerCart.post("/:cid/product/:pid", async (req, res) => {
    await manager.addProductToCart(parseInt(req.params.cid),parseInt(req.params.pid),1) //1 porque dice la diapositiva que de a 1 se agregan por ahora
    res.send("Producto Agregado")
});




export default routerCart