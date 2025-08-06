import Router from "express";
import { googleLogin, login, refresh, register, reSendOtp, VerifyAccount } from "./auth.service.js";
import { isvalid } from "../../middlewares/validation.middlewares.js";
import { registerSchema,loginSChema,verifyAccountSchema,reSendOtpSchema,googleLoginSchema,refreshSchema } from "./auth.validation.js";

 const router=Router();
 router.post("/register",isvalid(registerSchema),register);
 router.post("/verify-account",isvalid(verifyAccountSchema),VerifyAccount)
 router.post("/login",isvalid(loginSChema),login);
 router.post("/reSend-otp",isvalid(reSendOtpSchema),reSendOtp);
 router.post("/google-login",isvalid(googleLoginSchema),googleLogin);
 router.post("/refresh",isvalid(refreshSchema),refresh);
 export default router;