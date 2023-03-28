import userManager from "./userManager.js";
import { validatePassword } from "../../utils/bcrypt.js";


export const loginTest = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if (await userManager.checkLogin(email,password)== "Login exitoso"){ 
            const usuario = await userManager.getElementByEmail(email);
            req.session.first_name = usuario.first_name; //Para mostrar el nombre y el apellido, no mas datos ya que me parece mejor que sean personales y no mostrarlos 
            req.session.last_name = usuario.last_name;
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
}


export const loginControl = (req, res, next) => {
    req.session.login ? next() : res.redirect('/api/session/login')
}