import Router from "express";
import { deleteUser, updatePassword } from "./user.service.js";
const router =Router();
router.delete("/",deleteUser)
router.put("/update-password",updatePassword)
export default router;