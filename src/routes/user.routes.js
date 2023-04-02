import { Router } from "express";
import userManager from "../dao/ManagersGeneration/userManager.js";
import passport from "passport";


const routerUser = Router()

routerUser.post("/", async(req,res)=>{
    if(await userManager.createUser(req,res)=="Usuario Agregado"){
        res.redirect('api/session/login')
    }else{
        console.error("Usuario no agregado")
    }
})


routerUser.post("/register",passport.authenticate('register'), async(req,res)=>{
    if(await userManager.createUser(req,res)=="Usuario Agregado"){
        res.redirect('api/session/login')
    }else{
        console.error("Usuario no agregado")
    }
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
