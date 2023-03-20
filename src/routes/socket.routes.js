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


  routerSocket.get('/products', async(req,res) => {
    
    const products = await productManager.getElements()
    res.render("productsPaginate", { 
        titulo: "Practica Integradora Real Time Products",
        products: products
    })
  
  })
  

export default routerSocket;