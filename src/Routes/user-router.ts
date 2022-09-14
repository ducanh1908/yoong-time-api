import { Router } from "express";
import userController from "../controller/user-controller";

export const userRoute = Router()
userRoute.get('', userController.getAll)
userRoute.put('/:id', userController.updateUser)
userRoute.delete('/:id', userController.deleteUser)
// userRoute.get('/verified-email/:id', userController.verifyEmail)
userRoute.get('/:id', userController.getUser)
userRoute.put('/:id/follow', userController.follow)
userRoute.put('/:id/unfollow', userController.unfollow)

