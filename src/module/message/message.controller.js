import Router from "express";
import { SendMessage } from "./message.service.js";
import { isvalid } from "../../middlewares/validation.middlewares.js";
import { Messageschema } from "./message.validation.js";
import {fileUpload} from "../../utils/multer/multer.cloud.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
const router=Router();

router.post("/:receiver",fileUpload().array("attachments",3),isvalid(Messageschema),SendMessage);
router.post("/:receiver/sender",isAuthenticated,fileUpload().array("attachments",3),isvalid(Messageschema),SendMessage);
export default router;