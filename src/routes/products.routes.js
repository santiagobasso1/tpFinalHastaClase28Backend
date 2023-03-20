import { Router } from "express";
const routerProduct = Router();
import { ProductManager } from "../dao/FileSystem/models/ProductManager.js";
import { getManagerProducts } from "../dao/daoManager.js";
const manager = new ProductManager('src/dao/FileSystem/Files/products.json');


const productData = await getManagerProducts()
const managerProduct = new productData.ManagerProductMongoDB();

routerProduct.get("/", async (req, res) => {
    try{
        let productos = await managerProduct.getElements();
        res.send(productos)
    }catch{
        res.send("Hubo un problema mostrando los productos")
    }



});

routerProduct.get("/:pid", async (req, res) => {
    try{
        let respuesta = await managerProduct.getElementById(req.params.pid);
        res.send(respuesta)
    }catch{
        res.send("No se encontró el producto")
    }
});

routerProduct.post('/', async(req,res)=>{
    try{
        await managerProduct.addElements(req.body);
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