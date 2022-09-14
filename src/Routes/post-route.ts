import { Router } from 'express';
import postController from '../controller/post-controller';

export const postRoute = Router();

postRoute.post('',postController.createPost)
postRoute.put('/:id',postController.updatePost)
postRoute.delete('/:id',postController.deletePost)

