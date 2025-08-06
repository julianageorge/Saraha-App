import Router from "express";
import { deleteUser, updatePassword } from "./user.service.js";
import { asyncHandler } from "../../utils/error/index.js";
const router =Router();
router.delete("/",asyncHandler(deleteUser))
router.put("/update-password",asyncHandler(updatePassword))
export default router;