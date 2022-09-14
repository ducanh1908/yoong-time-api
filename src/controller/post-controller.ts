import { Response, Request } from "express";
import Post from "../model/post-model";
import User from "../model/user-model";

class PostController {
  createPost = async (req: Request, res: Response) => {
    let post = req.body;
    try {
      post = await Post.create(post);
      res.status(200).json(post);
    } catch (error) {
      res.status(400).json("create post error");
    }
  };
  updatePost = async (req: Request, res: Response) => {
    const idPost = req.params.id;

    const post = await Post.findById(idPost);

    if (post?.userId === req.body.userId) {
      await post?.updateOne({ $set: req.body });
      res.status(200).json("the post has been update");
    } else {
      res.status(403).json("you can update only your post");
    }
  };
  deletePost = async (req: Request, res: Response) => {
    const idPost = req.params.id;

    const post = await Post.findById(idPost);

    if (post?.userId === req.body.userId) {
      await post?.deleteOne();
      res.status(200).json("the post has been delete");
    } else {
      res.status(403).json("you can delete only your post");
    }
  };
  like = async (req: Request, res: Response) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post?.likes.includes(req.body.userId)) {
        await post?.updateOne({ $push: { likes: req.body.userId } });
        res.status(200).json("The post has been liked");
      } else {
        await post?.updateOne({ $pull: { likes: req.body.userId } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  getPost = async (req:Request, res:Response)=> {
    let idPost = req.params.id
    try {
    const post = await Post.findById(idPost);
    res.status(200).json(post)
        
    } catch (error) {
        res.status(500).json(error)
    }
    
  }
  timeline = async (req:Request, res:Response)=> {

try {
    const  currentUser = await User.findById(req.body.userId)
  
    if(currentUser !== null) {
        const userPost= await Post.find({userId: currentUser._id});
       let friendPosts = await Promise.all (
        currentUser.followings.map((friendId)=> {
           return Post.find({userId : friendId})
        })
        
        )   
        res.json(userPost.concat(...friendPosts))

    }
} catch (error) {
    res.status(500).json(error);
}
  }
}
export default new PostController();
