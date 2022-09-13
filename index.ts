import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json());
dotenv.config()


app.listen(`${process.env.PORT}`,()=> {
    console.log(`Server is running port : ${process.env.PORT}`);
})
