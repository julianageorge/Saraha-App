import Router from "express";
import { deleteUser, updatePassword, UploadProfilePic } from "./user.service.js";
import { fileUpload } from "../../utils/multer/index.js";
import { fileValidationMiddleware } from "../../middlewares/file.validation.middleware.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
const router =Router();
router.delete("/",deleteUser)
router.put("/update-password",updatePassword);
router.post("/upload-profile-pic",isAuthenticated,fileUpload({folder:"profilepics",MxSizeMB:1}).single("ProfilePic"),fileValidationMiddleware(),UploadProfilePic);
export default router;