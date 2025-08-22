import { populate } from "dotenv";
import Message from "../../DB/model/message.model.js";
import cloudinary, { uploadFiles } from "../../utils/cloud/cloudinary.config.js";

export const SendMessage=async(req,res,next)=>{
    const {content}=req.body;
    const {receiver}=req.params;
    const {files}=req;
    const attachments=await uploadFiles({files,options:{folder:`saraha/${receiver}/messages`}});
    const message=await Message.create({content,receiver,attachments,sender:req.user?._id});
    return res.status(201).json({message:"Message sent successfully",success:true,message});
}

export const getMessage=async(req,res,next)=>{
    const id=req.params.id;
    const message=await Message.findOne({_id:id,receiver:req.user._id},{},{populate:[{path:"receiver",select:"-password -otp -otpExpired -CredentialsUpdatedAt -deletedAt"}]});
    if(!message){
        throw new Error("Message not found",{cause:404});
    }
    return res.status(200).json({message:"Message fetched successfully",success:true,data:message});
}