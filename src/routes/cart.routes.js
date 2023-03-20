import { Router } from "express";
const routerCart = Router();
import productManager from "../dao/ManagersGeneration/productManager.js";
import cartManager from "../dao/ManagersGeneration/cartManager.js";



routerCart.get("/", async (req, res) => {
    try{
        res.send(await cartManager.getElements());
    }catch{
        res.send("Error al traer todos los carritos")
    }
});


routerCart.post("/", async (req, res) => {


    try{
        await cartManager.addElements({products:[]}); //No hice un metodo específico ya que no es necesario
        res.send("Carrito vacio creado")
    }catch{
        res.send("Error al agregar carrito")
    }
});




routerCart.get("/:cid", async (req, res) => {
    try{
        res.send(await cartManager.getElementById(req.params.cid)); //No hice uno específico para este ya que no es necesario más que solo el get element
    }catch{
        res.send("No se encontró el carrito")
    }
});




routerCart.post("/:cid/products/:pid", async (req, res) => {
    //FALTA COMPROBAR QUE EL PRODUCTO EXISTA
    try{        
        res.send(await cartManager.addItemToCart(req.params.cid,req.params.pid));
    }catch{
        res.send("Hubo un error al agregar el producto")
    }
});

routerCart.delete("/:cid/products/:pid", async (req, res) => {
    try{
        await cartManager.delItemFromCart(req.params.cid,req.params.pid);
        res.send("Producto eliminado");
    }catch{
        res.send("Hubo un error al intentar eliminar el producto del carrito")
    }
});


routerCart.delete("/:cid", async (req, res) => {
  try{
        await cartManager.delCartItems(req.params.cid);
        res.send("Productos del carrito eliminados")
    }catch{
        console.error("Hubo un error al intentar eliminar el carrito")
    }
});

export default routerCart