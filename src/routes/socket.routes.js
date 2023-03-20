import { Router } from "express";
import { getManagerProducts } from "../dao/daoManager.js";
const routerSocket = Router();


//Llamo al manager de productos

  // routerSocket.get('/', async(req,res) => {
  //   const productos = await productManager.getAllProducts()
  //       res.render("index", { 
  //       titulo: "Primera practica Integradora",
  //       products: productos
  //     })
  // })


  // routerSocket.get('/realtimeproducts', async(req,res) => {
    
  //   const products = await productManager.getAllProducts()
  //   res.render("realTimeProducts", { 
  //       titulo: "Practica Integradora Real Time Products",
  //       products: products
  //   })
  // })
  

export default routerSocket;