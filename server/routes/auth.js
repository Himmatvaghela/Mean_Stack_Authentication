import express from 'express'
const router=express.Router();
import { changePassword, forgetPassword, forgetPasswordCodeVerification, login, register } from '../controller/auth.js';

router.post('/register',register)
router.post('/login',login)
router.post('/forget-password',forgetPassword)
router.post('/forgetPasswordCodeVerification',forgetPasswordCodeVerification)
router.patch('/changePassword',changePassword)

export default router;