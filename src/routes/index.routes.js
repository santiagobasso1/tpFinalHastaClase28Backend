import { Router } from "express";
import routerSession from "./session.routes.js";
import rutasEnInicio from "./rutasEnInicio.routes.js";
import routerChat from "./chat.routes.js";
import routerProduct from "./products.routes.js";
import routerCart from "./cart.routes.js";
import routerUser from "./user.routes.js";
import express from "express";
import { __dirname } from "../path.js";
const router = Router();


router.use('/', rutasEnInicio)
router.use('/chat', routerChat)
router.use('/api/products', routerProduct)
router.use('/api/carts', routerCart)
router.use('/user', routerUser)
router.use('/api/session/', routerSession)
router.use('/', express.static(__dirname + '/public'))


export default router;