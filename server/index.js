import mongoose from "mongoose";
import  express, { json }  from "express";
import dotenv from "dotenv";
import authRoutes from './routes/auth.js'
import cors from 'cors';

const app=express()
dotenv.config()

app.use(express.json())
app.use(cors());

//Routes...
app.use('/auth',authRoutes)

const port=process.env.PORT || 6000;
mongoose.connect(process.env.MONGO_URL,{
    
}).then(()=>{
    app.listen(port,()=>{console.log(`your server started ${port}`) })
})
.catch((err)=>{
    console.log(err)
})