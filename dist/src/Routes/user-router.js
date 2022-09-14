"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
exports.userRoute = (0, express_1.Router)();
exports.userRoute.get('', user_controller_1.default.getAll);
exports.userRoute.post('/:id', user_controller_1.default.updateUser);
exports.userRoute.delete('/:id', user_controller_1.default.deleteUser);
// userRoute.get('/verified-email/:id', userController.verifyEmail)
exports.userRoute.get('/:id', user_controller_1.default.getUser);
