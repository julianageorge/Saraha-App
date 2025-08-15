import multer from "multer";
export function fileUpload({folder,allowedType=["image/jpeg","image/png","image/jpg"],MxSizeMB=2}={}){
    const storage=multer.diskStorage({});
    const fileFilter=(req,file,cb)=>{
        if(allowedType.includes(file.mimetype)){
            cb(null,true);
        }
        else{cb(new Error("Invalid file Type",{cause:400}),false);}
    }
    return multer({fileFilter,storage,limits:{fileSize:MxSizeMB*1024*1024}});
}