import Router from "express";
import { googleLogin, login, logout, refresh, register, resetPassword, SendOtp, VerifyAccount } from "./auth.service.js";
import { isvalid } from "../../middlewares/validation.middlewares.js";
import { registerSchema,loginSChema,verifyAccountSchema,reSendOtpSchema,googleLoginSchema, resetPasswordSchema } from "./auth.validation.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

 const router=Router();
 router.post("/register",isvalid(registerSchema),register);
 router.post("/verify-account",isvalid(verifyAccountSchema),VerifyAccount)
 router.post("/login",isvalid(loginSChema),login);
 router.post("/Send-otp",isvalid(reSendOtpSchema),SendOtp);
 router.post("/google-login",isvalid(googleLoginSchema),googleLogin);
 router.post("/refresh",refresh);
 router.patch("/reset-password",isvalid(resetPasswordSchema),resetPassword);
 router.post("/logout",isAuthenticated,logout)
 export default router;