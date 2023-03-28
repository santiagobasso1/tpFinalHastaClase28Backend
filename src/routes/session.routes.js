import { Router } from "express";
import userManager from "../dao/ManagersGeneration/userManager.js";
const routerSession = Router()

routerSession.get('/login', async (req, res) => {
    res.render("login", {
        titulo: "Desafio 4 Santiago Basso",
    })
})

routerSession.post("/testLogin", async (req, res) => {
    const {email,password} = req.body;
    try {
        if (await userManager.checkLogin(email,password)== "Login exitoso"){ 
            req.session.login = true
            res.redirect('/products')
        } else {
            res.redirect("/api/session/login", 500, {
                "message":"Login incorrecto"
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})


routerSession.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.redirect(200,'/api/session/login', { //REVISAR
        'divMessage': "Hola"
    })
})




export default routerSession
