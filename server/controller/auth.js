
import User from "../models/user.js";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const register =async (req,res)=>{
    try {
        const {name,job,email,password}= req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt)

        //if user exist with same email
        const users=await User.findOne({ email }).exec();
        if(users){
            res.status(409).json({error:'User Exist With This Email'})
            return;
        }

        //user creating
        const user= new User({
            name,
            job,
            email,
            password:passwordHash
        })

        const savedUser= await user.save()
        delete savedUser.password
        const token=Jwt.sign({savedUser},process.env.SECRET_KEY)
        res.status(201).json({token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login =async(req,res)=>{

}
