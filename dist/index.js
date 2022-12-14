"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
dotenv_1.default.config();
mongoose_1.default.connect(`${process.env.DB_URL}`).then(() => {
    console.log('Connected to database');
})
    .catch(e => {
    console.log('Database is not connected');
});
app.listen(`${process.env.PORT}`, () => {
    console.log(`Server is running port : ${process.env.PORT}`);
});
