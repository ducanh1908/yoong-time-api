import { Router } from 'express';
import postController from '../controller/post-controller';

export const postRoute = Router();

postRoute.post('',postController.createPost)