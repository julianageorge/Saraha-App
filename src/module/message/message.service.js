import Message from "../../DB/model/message.model.js";
import cloudinary, { uploadFiles } from "../../utils/cloud/cloudinary.config.js";

export const SendMessage=async(req,res,next)=>{
    const {content}=req.body;
    const {receiver}=req.params;
    const {files}=req;
    const attachments=await uploadFiles({files,options:{folder:`saraha/${receiver}/messages`}});
    const message=await Message.create({content,receiver,attachments});
    return res.status(201).json({message:"Message sent successfully",success:true,message});



}