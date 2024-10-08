import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';

const protectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.ETest
        if(!token){
            return res.status(401).json({error:"Unauthorized - No Token Provided"})
           }
        const decoded=jwt.verify(token,process.env.JWTSECRET);

        if(!decoded){
            return res.status(401).json({error:"Unauthorized - Invalid Token"}) 
        }

     const user=await User.findById(decoded.userId).select("-password")
     
    if(!user){
        return res.status(404).json({error:"User not found"})
    }
    req.user=user
    next()

    }catch(err){
        console.log("error in protecRoute middleware",err.message)
        res.status(500).json({err:"internal server error"})
    }

}

export default protectRoute