
import express from "express"
const router = express.Router()
import { auth } from "../middleware/auth.js";

import { authController } from "../controllers/api/authController.js";
import { usersController } from "../controllers/api/usersController.js";


router.post('/login',authController.login)
router.post('/register',authController.register)
router.get('/logout',authController.logout)



router.get('/get-all-users',auth , usersController.allusers)


export default router