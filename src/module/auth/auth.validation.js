import joi from "joi";
import { generalFields } from "../../middlewares/validation.middlewares.js";
 
export const registerSchema =joi.object({
    fullName:joi.string().min(5).max(15).required(),
    email:generalFields.email,
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    phoneNumber:generalFields.phoneNumber,
    dob:generalFields.dob
   }).or("email","phoneNumber");
export const loginSChema=joi.object({
    email:generalFields.email,
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
    phoneNumber:generalFields.phoneNumber
}).or("email","phoneNumber");
export const reSendOtpSchema=joi.object({
    email:generalFields.email.required()
});
export const verifyAccountSchema=joi.object({
    email:generalFields.email.required(),
    otp:joi.number().required()
});
export const googleLoginSchema=joi.object({
    idToken:joi.string().required()
});
export const refreshSchema=joi.object({
    refreshToken:joi.string().required()
});

export const resetPasswordSchema=joi.object({
    email:generalFields.email.required(),
    otp:joi.number().required(),
    NewPassword:generalFields.password.required(),
    rePassword:generalFields.rePassword("NewPassword").required()
});

export const logoutSchema=joi.object({
    refreshToken:joi.string().required(),
});

