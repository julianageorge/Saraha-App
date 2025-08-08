import { fileTypeFromBuffer } from "file-type";
import fs from "fs";
export const fileValidationMiddleware=(allowedType=["image/jpeg","image/png","image/jpg"])=>{
    return async (req,res,next)=>{
        const filePath=req.file.path;
        const buffer=fs.readFileSync(filePath);
        const fileType=await fileTypeFromBuffer(buffer);
        if(!fileType||!allowedType.includes(fileType.mime)){
          throw new Error("Invalid file type",{cause:400});
        }
        return next();
    }
  }