
import User from "../models/user.js";
import  Jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import dotenv from "dotenv";
import ForgetPasswordCode from "../models/forgetPasswordCode.js";

dotenv.config()

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
        const token=Jwt.sign({id:savedUser._id},process.env.SECRET_KEY)
        res.status(201).json({token})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const login =async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user= await User.findOne({email:email});
        if(!user) return res.status(400).json({msg:"User does not exist"})

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials"})

        const token = Jwt.sign({id:user._id},process.env.SECRET_KEY)
        delete user.password;
        res.status(200).json({token});
    }catch(err){
        res.status(500).json({error :err.message})
    }
}

//forget password 

export const forgetPassword=async(req,res)=>{

    try {
        
        const userEmail = req.body.email;
        const user= await User.findOne({email:userEmail});
        if(!user) return res.status(400).json({msg:"User does not exist"})
        
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure:false,
            auth: {
                user: process.env.email,
                pass: process.env.email_pass,
            }
        });

        function generateCode() {
            return Math.floor(1000 + Math.random() * 9000);
        }

        const code = generateCode(); // Generate a 4-digit code

        // Set expiration time (e.g., 10 minutes from now)
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 5);

        const mailOptions = {
            from: {
                name:'Himmat Vaghela',
                address:process.env.email
            },
            to: userEmail,
            subject: 'Forget Password Code',
            text: `Your 4-digit code for password change is : ${code}`,
        };

        const forgetPasswordCode = new ForgetPasswordCode({
            userEmail,
            code: code,
            expirationTime,
        });
      
        await forgetPasswordCode.save();

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
            console.error(error);
            res.status(500).send(error);
            } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({email:userEmail,msg:'Check Your email we Sent 4-digit code'});
            }
        });
        // res.status(200).json({msg:'Check Your email we Sent 4-digt code'})
    } catch (err) {
         res.status(500).json({error :err.message})
    }
}


//forget password code verification
export const forgetPasswordCodeVerification = async(req,res)=>{
    try {
        const userEmail = req.body.email;
        const enteredCode = req.body.code;
    
        // Find the latest verification code for the user's email
        const latestCode = await ForgetPasswordCode.findOne({ userEmail }).sort({ expirationTime: -1 });
    
        if (!latestCode) {
          // No verification code found for the user
          return res.status(400).json({ error: 'No verification code found. Please request a new one.' });
        }
    
        if (latestCode.expirationTime < new Date()) {
          // Code has expired
          return res.status(400).json({ error: 'Verification code has expired. Please request a new one.' });
        }
    
        if (latestCode.code !== enteredCode) {
          // Incorrect code
          return res.status(400).json({ error: 'Incorrect verification code. Please check and try again.' });
        }
    
        // Optionally, you can delete the used verification code from the database
        await ForgetPasswordCode.deleteMany({ userEmail });
    
        res.status(200).json({ msg: 'Verification successful update Password' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


//update password

export const changePassword= async(req,res)=>{
    
    try {
        const { email, password } = req.body;
    
        const salt = await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt)

        // Update password in the user model
        const updatedUser = await User.findOneAndUpdate(
            { email }, 
            { $set: { password: passwordHash } }, 
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Respond with success
        res.status(200).json({ success: true, message: 'Password updated successfully' });
    } catch (error) {
        console.error('Error updating password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
