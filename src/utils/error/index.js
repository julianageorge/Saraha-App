import Token from "../../DB/model/token.model.js";
import { verifyToken } from "../tokens/index.js";
import { generateToken, generaterefreshToken } from "../tokens/index.js";
import fs from "fs";

export const asyncHandler=(fn)=>{
    return (req,res,next)=>{
    
      fn(req,res,next).catch((err)=>{
       next(err);
      })
   
    }
  }

  export const globalErrorHandler=async(err,req,res,next)=>{
    
            if(req.file){
                fs.unlinkSync(req.file.path);
            }
            if(err.message=="jwt expired"){
                let  refreshToken=req.headers.refreshtoken;
                const payload=verifyToken(refreshToken,"julisdfghnvbn");
                const token=await Token.findOne({token:refreshToken,userId:payload.id,type:"refresh"});
                if(!token){
                    throw new Error("Invalid refresh token",{cause:401});
                }
                const accessToken=generateToken(payload.id);
                const NewrefreshToken=generaterefreshToken(payload.id);
                await Token.create({token:NewrefreshToken,userId:payload.id,type:"refresh"});
                return res.status(200).json({message:"refresh token successfully",success:true,accessToken,refreshToken:NewrefreshToken});
              
              }
               
            return res.status(err.cause||500).json({message:err.message,success:false,stack:err.stack});
  }