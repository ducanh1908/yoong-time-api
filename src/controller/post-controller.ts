import { Response,Request } from 'express';
import Post from '../model/post-model';

class PostController {

    createPost = async(req: Request, res:Response)=> {
        let post = req.body;
        try {
            post = await Post.create(post);
            res.status(200).json(post);
        } catch (error) {
            res.status(400).json('create post error')
        }
    }
}
export default new PostController();