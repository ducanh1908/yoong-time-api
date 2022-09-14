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
const post_model_1 = __importDefault(require("../model/post-model"));
class PostController {
    constructor() {
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let post = req.body;
            try {
                post = yield post_model_1.default.create(post);
                res.status(200).json(post);
            }
            catch (error) {
                res.status(400).json('create post error');
            }
        });
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const idPost = req.params.id;
            console.log(idPost);
            const post = yield post_model_1.default.findById(idPost);
            console.log(post);
            if ((post === null || post === void 0 ? void 0 : post.userId) === req.body.userId) {
                yield (post === null || post === void 0 ? void 0 : post.updateOne({ $set: req.body }));
                res.status(200).json('the post has been update');
            }
            else {
                res.status(403).json('you can update only your post');
            }
        });
    }
}
exports.default = new PostController();
