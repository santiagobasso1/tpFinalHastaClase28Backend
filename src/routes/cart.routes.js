import { Router } from "express";
const routerCart = Router();
import { getManagerCarts, getManagerProducts } from "../dao/daoManager.js";

const cartData = await getManagerCarts()
const managerCart = new cartData.ManagerCartMongoDB();


routerCart.get("/", async (req, res) => {
    try{
        res.send(await managerCart.getElements());
    }catch{
        res.send("Error al traer todos los carritos")
    }
});


routerCart.post("/", async (req, res) => {


    try{
        await managerCart.addElements({products:[]}); //No hice un metodo específico ya que no es necesario
        res.send("Carrito vacio creado")
    }catch{
        res.send("Error al agregar carrito")
    }
});




routerCart.get("/:cid", async (req, res) => {
    try{
        res.send(await managerCart.getElementById(req.params.cid)); //No hice uno específico para este ya que no es necesario más que solo el get element
    }catch{
        res.send("No se encontró el carrito")
    }
});




routerCart.post("/:cid/products/:pid", async (req, res) => {
    //FALTA COMPROBAR QUE EL PRODUCTO EXISTA
    try{        
        await managerCart.addItemToCart(req.params.cid,req.params.pid);
        res.send("Producto Agregado al carrito")
    }catch{
        res.send("Hubo un error al agregar el producto")
    }
});

routerCart.delete("/:cid/products/:pid", async (req, res) => {
    try{
        await managerCart.delItemFromCart(req.params.cid,req.params.pid);
        res.send("Producto eliminado");
    }catch{
        res.send("Hubo un error al intentar eliminar el producto del carrito")
    }
});


routerCart.delete("/:cid", async (req, res) => {
  try{
        await managerCart.delCartItems(req.params.cid);
        res.send("Productos del carrito eliminados")
    }catch{
        console.error("Hubo un error al intentar eliminar el carrito")
    }
});

export default routerCart