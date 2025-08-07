import Router from "express";
import { deleteUser, updatePassword, UploadProfilePic } from "./user.service.js";
import { fileUpload } from "../../utils/multer/index.js";
const router =Router();
router.delete("/",deleteUser)
router.put("/update-password",updatePassword);
router.post("/upload-profile-pic",fileUpload().single("ProfilePic"),UploadProfilePic);
export default router;