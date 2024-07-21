import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import { connectToMongoDb } from './db/connectToMongodb.js';
import authrouter from './routes/auth.route.js'

dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())


app.use("/user",authrouter)

connectToMongoDb().then(()=>{
    app.listen(process.env.PORT||3000,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
})
}).catch((err)=>{
    console.log("error connecting to database",err.message)
})