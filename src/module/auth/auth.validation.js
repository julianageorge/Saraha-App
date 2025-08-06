import joi from "joi";
 
export const registerSchema =joi.object({
    fullName:joi.string().min(5).max(15).required(),
    email:joi.string().email({tlds:["com","eg","org"]}),
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    phoneNumber:joi.string().min(11).max(11),
    dob:joi.date()
   }).or("email","phoneNumber");
export const loginSChema=joi.object({
    email:joi.string().email({tlds:["com","eg","org"]}),
    password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(6).required(),
    phoneNumber:joi.string().min(11).max(11)
}).or("email","phoneNumber");
export const reSendOtpSchema=joi.object({
    email:joi.string().email({tlds:["com","eg","org"]}).required()
});
export const verifyAccountSchema=joi.object({
    email:joi.string().email({tlds:["com","eg","org"]}).required(),
    otp:joi.number().required()
});
export const googleLoginSchema=joi.object({
    idToken:joi.string().required()
});
export const refreshSchema=joi.object({
    refreshToken:joi.string().required()
});


