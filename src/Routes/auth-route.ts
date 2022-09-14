import { Router } from "express";
import authController from "../controller/auth-controller";

export  const authRoute = Router();

authRoute.post('/register', authController.register)
authRoute.post('/login', authController.login)
