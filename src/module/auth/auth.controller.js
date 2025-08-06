import Router from "express";
import { googleLogin, login, refresh, register, reSendOtp, VerifyAccount } from "./auth.service.js";
import { asyncHandler } from "../../utils/error/index.js";
 const router=Router();
 router.post("/register",asyncHandler(register));
 router.post("/verify-account",asyncHandler(VerifyAccount))
 router.post("/login",asyncHandler(login));
 router.post("/reSend-otp",asyncHandler(reSendOtp));
 router.post("/google-login",asyncHandler(googleLogin));
 router.post("/refresh",asyncHandler(refresh));
 export default router;