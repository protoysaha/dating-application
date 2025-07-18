
import express from "express"
const router = express.Router()
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { isAdmin } from "../middleware/isAdmin.js";

import { authController } from "../controllers/authController.js";

router.get('/',authController.login)
router.get('/login',authController.login)
router.post('/login',authController.auth)

router.get('/register',authController.register)
router.post('/register',authController.register_submit)

router.get('/dashboard',isLoggedIn,isAdmin, authController.dashboard)

router.get('/logout',authController.logout)


export default router