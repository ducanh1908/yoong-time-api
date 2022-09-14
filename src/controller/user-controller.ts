import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import User from "../model/user-model";
class Usercontroller {
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await User.find();
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };
  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;
    try {
      await User.findByIdAndDelete(idUser);
      res.status(200).json("Account has been deleted");
    } catch (e) {
      next(e);
    }
  };
  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;

    try {
      let user = await User.findById(idUser);
      if (!user) {
        res.status(404).json();
      } else {
        let data = req.body;
        data.password = await bcrypt.hash(data.password, 10);
        await User.findOneAndUpdate(
          {
            _id: idUser,
          },
          data
        );
        data._id = idUser;
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }

    // try {
    //   const updateUser = await User.findByIdAndUpdate(
    //     idUser,
    //     { $set: req.body },
    //     { new: true }
    //   );
    //   res.status(200).json(updateUser);
    // } catch (e) {
    //   next(e);
    // }
  };
  getUser = async (req: Request, res: Response, next: NextFunction) => {
    let idUser = req.params.id;
    try {
      let user = await User.findById(idUser);
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  };
  verifyEmail = async (req: Request, res: Response) => {
    let id = req.params.id;
    console.log(id);
    let user = await User.findOne({ _id: id });
    if (!user) {
      res.status(401).json({
        message: "Email is not verified",
      });
    } else {
      await User.updateOne({ _id: id }, { verified: true });
      res.status(200).json({
        message: "Email is verified",
      });
    }
  };
  follow = async (req: Request, res: Response) => {
    let id = req.params.id;
    if (req.body.userId !== id) {
      try {
        const user = await User.findById(id);
        const currentUser = await User.findById(req.body.userId);
        if (user !== null && currentUser !== null) {
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: id } });
            res.status(200).json("user has been followed");
          } else {
            res.status(403).json("you allready follow this user");
          }
        }
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("you can follow youself");
    }
  };
}
export default new Usercontroller();
