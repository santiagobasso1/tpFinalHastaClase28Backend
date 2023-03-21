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
    let resultadoOperaciones = "error";
    let enlace="/api/products?";
    let enlaceProximo, enlacePrevio;
    if (limit==undefined){
        limit = 10;
    }else{
        enlace=enlace+"limit="+limit+"&"
    }
    if (page==undefined){
        page=1;
        enlaceProximo=enlace;
        enlacePrevio=enlace;
    }else{
        enlaceProximo=enlace+"page="+(parseInt(page)+1)
        enlacePrevio=enlace+"page="+(parseInt(page)-1)
    }


    let resultado;
    if (stock!=undefined){        
        resultado = await productManager.paginate({stock:stock},{limit:limit,page:page})
        resultadoOperaciones="success";
    }else if(category!=undefined){
        resultado = await productManager.paginate({category:category},{limit:limit,page:page})
        resultadoOperaciones="success";
    }else{
        resultado = await productManager.paginate({},{limit:limit,page:page}) 
        resultadoOperaciones="success";
    }
    let ordenamiento = 1;
    

    if (sort!=undefined){
        if (sort.toLowerCase()=="asc"){
            ordenamiento=1;
        }else if(sort.toLocaleLowerCase()=="desc"){
            ordenamiento=-1;
        }
        
        resultado={docs:await productManager.aggregate([{$sort: {price: ordenamiento}}])}  //Para cambiar el factor de ordenamiento se cambia el "title" por el campo que se quiere ordenar
        resultadoOperaciones="success";
    }
    const resultadoFinalPayload = {
        status:resultadoOperaciones, //a
        payload:resultado.docs,
        totalPages: resultado.totalPages,
        prevPage:resultado.prevPage,
        nextPage:resultado.nextPage,
        page: resultado.page,
        hasPrevPage: resultado.hasPrevPage,
        hasNextPage: resultado.hasNextPage,
        prevLink:enlacePrevio,
        nextLink:enlaceProximo
    }
    res.send(resultadoFinalPayload)
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