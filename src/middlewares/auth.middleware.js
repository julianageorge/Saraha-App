import { verifyToken } from "../utils/tokens/index.js";
import User from "../DB/model/user.model.js";
import Token from "../DB/model/token.model.js";

export const isAuthenticated=async(req,res,next)=>{
    const token=req.headers.authorization;
    if(!token){
        throw new Error("token is required",{cause:401});
    }
    const payload=verifyToken(token);
    if(!payload){
        throw new Error("Invalid token",{cause:401});
    }
    const BlockedToken= await Token.findOne({token,type:"access"});
    if(BlockedToken){
        throw new Error("token is blocked",{cause:401});
    }
    const id=payload.id;
    const user=await User.findById(id);
    if(!user){
        throw new Error("User not found",{cause:404});
    }
    req.user=user;
    return next();
}
    
