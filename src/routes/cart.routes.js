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
        await managerCart.addElements({products:[]});
        res.send("Carrito vacio creado")
    }catch{
        res.send("Error al agregar carrito")
    }
});




routerCart.get("/:cid", async (req, res) => {
    try{
        res.send(await managerCart.getElementById(req.params.cid));
    }catch{
        res.send("No se encontró el carrito")
    }
});




routerCart.post("/:cid/products/:pid", async (req, res) => {
    //FALTA COMPROBAR QUE EL PRODUCTO EXISTA
    try{
        const cart = await managerCart.getElementById(req.params.cid);
        if (cart.products.length>0){
            let encontrado = false;
            cart.products.forEach(producto => {
                if (producto.productId==req.params.pid){
                    producto.quantity+=1;
                    encontrado=true;
                }
            });
            if (!encontrado){
                cart.products.push({productId:req.params.pid,quantity:1})
            }
        }else{
            cart.products.push({productId:req.params.pid,quantity:1})
        }
        //Compruebo que exista en el carrito para agregarle 1 a la cantidad en lugar de agregarle puras veces el mismo producto al mismo carrito
        await managerCart.updateElement(req.params.cid,cart);
        res.send("Producto Agregado al carrito")
    }catch{
        res.send("Hubo un error al agregar el producto")
    }
});

routerCart.delete("/:cid/products/:pid", async (req, res) => {
    try{
        const cart = await managerCart.getElementById(req.params.cid);
        const productosFiltrados = cart.products.filter((producto) => producto.productId !== req.params.pid)
        
        await managerCart.updateElement(req.params.cid,{products:productosFiltrados});
        res.send("Producto eliminado");
    }catch{
        res.send("Hubo un error al intentar eliminar el producto del carrito")
    }
    // try{
    //     let respuesta = await manager.deleteProductById(parseInt(req.params.cid),parseInt(req.params.pid),1) //1 porque dice la diapositiva que de a 1 se agregan por ahora
    //     res.send(respuesta)
    // }catch{
    //     res.send("Error en alguno de los archivos")
    // }

});







export default routerCart