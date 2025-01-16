import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()

const app=express()

//for allowing json object in request body
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("Database is connected");
})
.catch((error)=>{
  console.log(error);
})

app.listen(4000,()=>{
  console.log("Server is running on port 4000!!");
  
})

app.use("/api/auth",authRoutes)

app.use((error,req,res,next)=>{
  const statusCode=error.statusCode ||500

  const message=error.message || "Internal server error"

  res.status(statusCode).json({
    successs:false,
    statusCode,
    message
  })
})