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
    updatePost = async(req: Request, res:Response)=> {
        const idPost = req.params.id
        console.log(idPost);
        const post = await Post.findById(idPost)
        console.log(post)
        if(post?.userId === req.body.userId) {
            await post?.updateOne({$set: req.body})
            res.status(200).json('the post has been update')
        }
        else {
            res.status(403).json('you can update only your post')
        }
    }
}
export default new PostController();