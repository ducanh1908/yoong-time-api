import { Router } from "express";
import userController from "../controller/user-controller";

export const userRoute = Router()
userRoute.get('', userController.getAll)
userRoute.post('/:id', userController.updateUser)
userRoute.delete('/:id', userController.deleteUser)
// userRoute.get('/verified-email/:id', userController.verifyEmail)
userRoute.get('/:id', userController.getUser)
