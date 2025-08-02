import jwt from "jsonwebtoken";
import User from "../../DB/model/user.model.js";
import bcrypt from "bcrypt";

export const deleteUser=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const payload=jwt.verify(token,"kkjhgfdsasdfghjkl");
        const id=payload.id;
        const deleteUser=await User.findByIdAndDelete(id);
        if(!deleteUser){
            throw new Error("User not found",{cause:404});
        }
        return res.status(200).json({message:"User deleted successfully",success:true});

    }
    catch(err){
        return res.status(err.cause||500).json({message:err.message,success:false});
    }
}

export const updatePassword=async(req,res,next)=>{
    try{
        const token=req.headers.authorization;
        const payload=jwt.verify(token,"kkjhgfdsasdfghjkl");
        const id=payload.id;
        const {oldPassword,newPassword}=req.body;
        const user=await User.findById(id);
        if(!user){
            throw new Error("User not found",{cause:404});
        }
        const match=bcrypt.compareSync(oldPassword,user.password);
        if(!match){
            throw new Error("Invalid old password",{cause:401});
        }
        const hashedPassword=bcrypt.hashSync(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({message:"Password updated successfully",success:true});

    }
    catch(err){
        return res.status(err.cause||500).json({message:err.message,success:false});
    }

}