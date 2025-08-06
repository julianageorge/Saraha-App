import Router from "express";
import { googleLogin, login, refresh, register, reSendOtp, VerifyAccount } from "./auth.service.js";

 const router=Router();
 router.post("/register",register);
 router.post("/verify-account",VerifyAccount)
 router.post("/login",login);
 router.post("/reSend-otp",reSendOtp);
 router.post("/google-login",googleLogin);
 router.post("/refresh",refresh);
 export default router;