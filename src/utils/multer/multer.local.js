import multer from "multer";
import { nanoid } from "nanoid";
import fs from "fs";
export function fileUpload({folder,allowedType=["image/jpeg","image/png","image/jpg"],MxSizeMB=2}={}){
    const storage=multer.diskStorage({
        destination:(req,file,cb)=>{
            const dest=`Uploads/${req.user._id}/${folder}`;
            if(!fs.existsSync(dest)){
                fs.mkdirSync(dest,{recursive:true});
            }
            cb(null,dest);
        },
        filename:(req,file,cb)=>{
            cb(null,nanoid(5)+"_"+file.originalname);
        }
    });
    const fileFilter=(req,file,cb)=>{
        if(allowedType.includes(file.mimetype)){
            cb(null,true);
        }
        else{cb(new Error("Invalid file Type",{cause:400}),false);}
    }
    return multer({fileFilter,storage,limits:{fileSize:MxSizeMB*1024*1024}});
}