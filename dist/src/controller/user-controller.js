"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = __importDefault(require("../model/user-model"));
class Usercontroller {
    constructor() {
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_model_1.default.find();
                res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
        });
        this.deleteUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idUser = req.params.id;
            try {
                yield user_model_1.default.findByIdAndDelete(idUser);
                res.status(200).json("Account has been deleted");
            }
            catch (e) {
                next(e);
            }
        });
        this.updateUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idUser = req.params.id;
            try {
                let user = yield user_model_1.default.findById(idUser);
                if (!user) {
                    res.status(404).json();
                }
                else {
                    let data = req.body;
                    data.password = yield bcrypt_1.default.hash(data.password, 10);
                    yield user_model_1.default.findOneAndUpdate({
                        _id: idUser,
                    }, data);
                    data._id = idUser;
                    res.status(200).json(data);
                }
            }
            catch (error) {
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
        });
        this.getUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            let idUser = req.params.id;
            try {
                let user = yield user_model_1.default.findById(idUser);
                res.status(200).json(user);
            }
            catch (e) {
                next(e);
            }
        });
        this.verifyEmail = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            console.log(id);
            let user = yield user_model_1.default.findOne({ _id: id });
            if (!user) {
                res.status(401).json({
                    message: "Email is not verified",
                });
            }
            else {
                yield user_model_1.default.updateOne({ _id: id }, { verified: true });
                res.status(200).json({
                    message: "Email is verified",
                });
            }
        });
        this.follow = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let id = req.params.id;
            if (req.body.userId !== id) {
                try {
                    const user = yield user_model_1.default.findById(id);
                    const currentUser = yield user_model_1.default.findById(req.body.userId);
                    if (user !== null && currentUser !== null) {
                        if (!user.followers.includes(req.body.userId)) {
                            yield user.updateOne({ $push: { followers: req.body.userId } });
                            yield currentUser.updateOne({ $push: { followings: id } });
                            res.status(200).json("user has been followed");
                        }
                        else {
                            res.status(403).json("you allready follow this user");
                        }
                    }
                }
                catch (error) {
                    res.status(500).json(error);
                }
            }
            else {
                res.status(403).json("you can follow youself");
            }
        });
    }
}
exports.default = new Usercontroller();
