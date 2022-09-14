import { postRoute } from './post-route';
import { userRoute } from './user-router';
import { Router } from "express";
import { authRoute } from "./auth-route";
export const route = Router()
route.use('',authRoute)
route.use('/users',userRoute)
route.use('/posts', postRoute)