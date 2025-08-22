import Router from "express";
import { SendMessage,getMessage } from "./message.service.js";
import { isvalid } from "../../middlewares/validation.middlewares.js";
import {fileUpload} from "../../utils/multer/multer.cloud.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { GetMessagesSchema, SendMessageschema } from "./message.validation.js";
const router=Router();

router.post("/:receiver",fileUpload().array("attachments",3),isvalid(SendMessageschema),SendMessage);
router.post("/:receiver/sender",isAuthenticated,fileUpload().array("attachments",3),isvalid(SendMessageschema),SendMessage);
router.get("/:id",isAuthenticated,isvalid(GetMessagesSchema),getMessage);
export default router;