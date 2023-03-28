import { Router } from "express";
import userManager from "../dao/ManagersGeneration/userManager.js";
const routerUser = Router()

routerUser.post("/", async(req,res)=>{
    res.redirect("/products")
    // if(await userManager.createUser(req,res)=="Usuario Agregado"){
    //     res.redirect('api/session/login')
    // }else{
    //     console.error("Usuario no agregado")
    // }
    
    
})

routerUser.get('/email/:email', async (req, res) => {
    res.send(await userManager.getElementByEmail(req.params.email));
})


routerUser.get('/register', async (req, res) => {
    res.render("register", {
        titulo: "Desafio 4 Santiago Basso",
    })
})

export default routerUser

/*
    a) Usuario se registra correctamente -> Va a login
    b) Usuario se registra con un email existente -> Vuelve a registro con mensaje de error
    c) Usuario intenta loguearse pero datos no validos -> Va a Login va con mensaje
    d) Usuario no esta registrado -> Va al login con mensaje
    e) Usuario inicia sesion y no es admin -> Va a products con rol de user
    f) Usuario inicia sesion y es admin -> Va a products con rol de admin
    g) Usuario se desloguea -> Va a login con mensaje

*/