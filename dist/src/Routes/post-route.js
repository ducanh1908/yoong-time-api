"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoute = void 0;
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controller/post-controller"));
exports.postRoute = (0, express_1.Router)();
exports.postRoute.post('', post_controller_1.default.createPost);
exports.postRoute.put('/:id', post_controller_1.default.updatePost);
exports.postRoute.delete('/:id', post_controller_1.default.deletePost);
