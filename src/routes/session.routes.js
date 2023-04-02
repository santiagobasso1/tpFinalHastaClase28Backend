import { Router } from "express";
import userManager from "../dao/ManagersGeneration/userManager.js";
import { loginTest } from "../dao/ManagersGeneration/sessionManager.js";
const routerSession = Router()




routerSession.get('/login', async (req, res) => {
    const {message} = req.body;
    res.render("login", {
        titulo: "Desafio 4 Santiago Basso",
        // message:req.body.message
    })
})

routerSession.post("/testLogin", async (req, res) => {
    loginTest(req,res)
})


routerSession.get("/logout", (req, res) => {
    if (req.session.login) {
        req.session.destroy()
    }
    res.redirect(200,'/api/session/login', { 
        'divMessage': "Hola"
    })
})




export default routerSession
