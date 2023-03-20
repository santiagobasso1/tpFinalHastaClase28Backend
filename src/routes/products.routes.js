import { Router } from "express";
const routerProduct = Router();
import { getproductManagers } from "../dao/daoManager.js";
import productManager from "../dao/ManagersGeneration/productManager.js"

// routerProduct.get("/", async (req, res) => {

//     try{
//         res.send(await productManager.getElements())
//     }catch{
//         res.send("Hubo un problema mostrando los productos")
//     }
// });



routerProduct.get("/", async (req, res) => {
    let { limit, page, stock, category, sort } = req.query;
    if (limit==undefined){
        limit = 10;
    }
    if (page==undefined){
        page=1;
    }
    let resultado;
    if (stock!=undefined){
        resultado = await productManager.paginate({stock:stock},{limit:limit,page:page})
    }else if(category!=undefined){
        resultado = await productManager.paginate({category:category},{limit:limit,page:page})
    }else{
        resultado = await productManager.paginate({},{limit:limit,page:page}) 
    }
    let ordenamiento = 1;


    if (sort!=undefined){
        if (sort.toLowerCase()=="asc"){
            ordenamiento=1;
        }else if(sort.toLocaleLowerCase()=="desc"){
            ordenamiento=-1;
        }
        resultado= await productManager.aggregate([{$sort: {price: ordenamiento}}]) //Para cambiar el factor de ordenamiento se cambia el "title" por el campo que se quiere ordenar
    }

    res.send(resultado)
});













routerProduct.get("/:pid", async (req, res) => {
    try{
        res.send(await productManager.getElementById(req.params.pid));
    }catch{
        res.send("No se encontró el producto")
    }
});

routerProduct.post('/', async(req,res)=>{
    try{
        await productManager.addElements(req.body); //Hacerle controles
        res.send("Producto Agregado")
    }catch{
        res.send("Hubo un error al agregar el producto")
    }
})

routerProduct.put("/:pid", async (req, res) => {
    try{
        await productManager.updateElement(req.params.pid,{title:req.body.title, description:req.body.description, price: req.body.price, thumbnail:req.body.thumbnail, code:req.body.code, stock:req.body.stock,status:req.body.status,category:req.body.category })
        res.send("Producto Actualizado")
    }catch{
        res.send("Hubo un error al actualizar el producto");
    }
});
routerProduct.delete("/:pid", async(req,res)=>{
    try{
        await productManager.deleteElement(req.params.pid)
        res.send("Producto eliminado");
    }catch{
        res.send("Hubo un problema al eliminar el producto")
    }
});


export default routerProduct