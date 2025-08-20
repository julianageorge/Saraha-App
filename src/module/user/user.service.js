import User from "../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import cron from "node-cron";
import cloudinary, { deleteFiles, uploadFile } from "../../utils/cloud/cloudinary.config.js";
export const deleteUser=async(req,res,next)=>{
        const {id}=req.user;
        //delete from cloudinary
        if(req.user.ProfilePic.public_id){
          await cloudinary.api.delete_resources_by_prefix(`saraha/${id}/profilepics`);
        }  await cloudinary.api.delete_folder(`saraha/${id}/profilepics`);
         await User.deleteOne({_id:id});
        return res.status(200).json({message:"User deleted successfully",success:true});

   
}

export const updatePassword=async(req,res,next)=>{
        const user=req.user;
        const {oldPassword,newPassword}=req.body;
        const match=bcrypt.compareSync(oldPassword,user.password);
        if(!match){
            throw new Error("Invalid old password",{cause:401});
        }
        const hashedPassword=bcrypt.hashSync(newPassword,10);
        user.password=hashedPassword;
        await user.save();
        return res.status(200).json({message:"Password updated successfully",success:true});

 

}
export const UploadProfilePic=async(req,res,next)=>{
    if(req.user.ProfilePic){
    fs.unlinkSync(req.user.ProfilePic);
    }
   const {id}=req.user;
   const user=await User.findByIdAndUpdate(id,{ProfilePic:req.file.path},{new:true});
   if(!user){
    throw new Error("User not found",{cause:404});
   }
   return res.status(200).json({message:"Profile pic uploaded successfully",success:true,user});
}

export const DeleteUnverifiedUsers=()=>{
    cron.schedule(`0 0 1 * *`,async()=>{
       const oneMonthAgo= new Date();
       oneMonthAgo.setMonth(oneMonthAgo.getMonth()-1);
        
       const unverifiedUsers = await User.deleteMany({
        isVerified: false,
        createdAt: { $lt: oneMonthAgo }
    });

    if (unverifiedUsers.deletedCount > 0) {
        console.log(`Delete ${unverifiedUsers.deletedCount} unverified accounts created before ${oneMonthAgo}`);
    } else {
        console.log(`No unverified users found for deletion`);
    }
    })
}

export const UploadProfilePicCloud=async(req,res,next)=>{
    const {id}=req.user;
    const file=req.file;
    if(req.user.ProfilePic.public_id){
        await deleteFiles(`saraha/${id}/profilepics`);}
    
    const {secure_url,public_id}=await uploadFile({path:file.path,options:{folder:`saraha/${id}/profilepics`}});
    await User.updateOne({ _id: id }, { ProfilePic: { secure_url, public_id } },{new:true});

   return res.status(200).json({message:"Profile pic uploaded successfully",success:true,user:req.user});





}