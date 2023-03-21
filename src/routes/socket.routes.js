import { Router } from "express";
import { getproductManagers } from "../dao/daoManager.js";
const routerSocket = Router();
import productManager from "../dao/ManagersGeneration/productManager.js";

//Llamo al manager de productos

// routerSocket.get('/', async(req,res) => {
//   const productos = await productManager.getAllProducts()
//       res.render("index", { 
//       titulo: "Primera practica Integradora",
//       products: productos
//     })
// })

routerSocket.get('/productsGet',async(req,res)=>{
  
  const products = await productManager.getElements()
  res.json(products)
})
routerSocket.get('/products', async (req, res) => {

  res.render("productsPaginate", {
    titulo: "TP Final Santiago Basso",
  })

})


export default routerSocket;