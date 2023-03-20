import { Router } from "express";
const routerProduct = Router();
import { getManagerProducts } from "../dao/daoManager.js";


const productData = await getManagerProducts()
const managerProduct = new productData.ManagerProductMongoDB();

routerProduct.get("/", async (req, res) => {
    try{
        res.send(await managerProduct.getElements())
    }catch{
        res.send("Hubo un problema mostrando los productos")
    }
});

routerProduct.get("/:pid", async (req, res) => {
    try{
        res.send(await managerProduct.getElementById(req.params.pid));
    }catch{
        res.send("No se encontró el producto")
    }
});

routerProduct.post('/', async(req,res)=>{
    try{
        await managerProduct.addElements(req.body); //Hacerle controles
        res.send("Producto Agregado")
    }catch{
        res.send("Hubo un error al agregar el producto")
    }
})

routerProduct.put("/:pid", async (req, res) => {
    try{
        await managerProduct.updateElement(req.params.pid,{title:req.body.title, description:req.body.description, price: req.body.price, thumbnail:req.body.thumbnail, code:req.body.code, stock:req.body.stock,status:req.body.status,category:req.body.category })
        res.send("Producto Actualizado")
    }catch{
        res.send("Hubo un error al actualizar el producto");
    }
});
routerProduct.delete("/:pid", async(req,res)=>{
    try{
        await managerProduct.deleteElement(req.params.pid)
        res.send("Producto eliminado");
    }catch{
        res.send("Hubo un problema al eliminar el producto")
    }
});


export default routerProduct