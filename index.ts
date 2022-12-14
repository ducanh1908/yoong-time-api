import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import dotenv from 'dotenv';
const app = express();

app.use(bodyParser.json());
dotenv.config()
mongoose.connect(`${process.env.DB_URL}`).then(()=> {
    console.log('Connected to database');
})
.catch(e =>{
    console.log('Database is not connected');
})

app.listen(`${process.env.PORT}`,()=> {
    console.log(`Server is running port : ${process.env.PORT}`);
})
