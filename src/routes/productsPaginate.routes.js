import { Router } from "express";
const routerProductsPaginate = Router();
import productManager from "../dao/ManagersGeneration/productManager.js";

routerProductsPaginate.get("/", async (req, res) => {
    // const resultados = await productManager.paginate({},{limit:2,page:3})
    const productos = await productManager.getElements()
    res.render("productsPaginate",{productos});
});




export default routerProductsPaginate