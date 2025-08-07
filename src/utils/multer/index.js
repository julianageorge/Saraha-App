import multer from "multer";
import { nanoid } from "nanoid";
export function fileUpload(){
    const storage=multer.diskStorage({
        destination:"Uploads",
        filename:(req,file,cb)=>{
            console.log(file);
            cb(null,nanoid(5)+"_"+file.originalname);
        }
    });
    return multer({storage});
}