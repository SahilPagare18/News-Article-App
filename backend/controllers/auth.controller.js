import bcryptsjs from "bcryptjs"
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken'

export const signup=async ( req,res,next)=>{
  const {username,email,password}=req.body;

  console.log(req.body);
  

  if(!username || !email || !password || username==="" || email==="" || password===""){
   return next(errorHandler(400,"All fields are required"))
  }

  const hashedPassword= bcryptsjs.hashSync(password,10)

  const newUser= new User({
    username,
    email,
    password:hashedPassword
  })

  try {
    await newUser.save()
    res.json("Signup successfully!!")

  } catch (error) {
    console.log(error)
    next(error)
  }
}

export const signin=async(req,res,next)=>{
 try {
  const {email,password}=req.body;

  if(!email || !password || email==" "|| password==" "){
    return res.json(400,{message:"All fields are requires"})
  }
   const validUser=await User.findOne({email})
 
   if(!validUser){
     return res.json(401,{message:"User not find"})
   }
 
   const validPassword=await bcryptsjs.compareSync(password,validUser.password)
 
   if(!validPassword){
     return res.json(401,{message:"Invalid Credentials"})
   }

   const token=jwt.sign({id:validUser._id},process.env.JWT_SECRET)

   const {password:pass,...rest}=validUser._doc

   res.status(200).cookie("access-token",token,{httpOnly:true}).json(rest)
 } catch (error) {
  next(error)
 }
}