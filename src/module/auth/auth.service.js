import User from "../../DB/model/user.model.js";
import bcrypt from "bcrypt";
import { sendMail } from "../../utils/email/index.js";
import { generateOtp } from "../../utils/OTP/index.js";
import { OAuth2Client } from "google-auth-library";
import CryptoJS from "crypto-js";
import { generaterefreshToken, generateToken } from "../../utils/tokens/index.js";
import { hashPassword } from "../../utils/hash/index.js";
import Token from "../../DB/model/token.model.js"
export const register=async(req,res,next)=>{
 const{fullName,email,password,phoneNumber,dob}=req.body;
 
      const user = await User.findOne({
          $or: [
            {
              $and: [
                { email: { $exists: true } },
                { email: { $ne: null } },
                { email: email }
              ]
            },
            {
              $and: [
                { phoneNumber: { $exists: true } },
                { phoneNumber: { $ne: null } },
                { phoneNumber: phoneNumber }
              ]
            }
          ]
        });
      if(user){          
          throw new Error("User already exists",{cause:409});
      }
      const hashedPassword=bcrypt.hashSync(password,10);
      const encryptedPhoneNumber=CryptoJS.AES.encrypt(phoneNumber,"kkjhgfdsasdfghjkl").toString();
      const newUser=new User({fullName,email,phoneNumber:encryptedPhoneNumber,dob,password:hashedPassword});
      const{otp,otpExpired}=generateOtp();
      newUser.otp=otp;
      newUser.otpExpired=otpExpired;
      if(email){
      await sendMail({to:email,subject:"Verify your email",html:`<p>your Otp to verify your account is ${otp}</p>`})
      }
      await newUser.save();
      return res.status(201).json({message:"User registered successfully",success:true});
    }
export const VerifyAccount =async(req,res,next)=>{
const{email,otp}=req.body;
const user=await User.findOne({email,otp,otpExpired:{$gte:Date.now()}});
if(!user){
  throw new Error("Invalid otp",{cause:401});
}
user.isVerified=true;
user.otp=undefined;
user.otpExpired=undefined;
await user.save();
return res.status(200).json({message:"User verified successfully",success:true});
}

export const SendOtp=async(req,res,next)=>{
const{email}=req.body;
const {otp,otpExpired}=generateOtp();
const user=await User.findOneAndUpdate({email},{otp,otpExpired});
if(!user){
  throw new Error("User not found",{cause:404});
}
await sendMail({to:email,subject:"Send Otp",html:`<p>your Otp is ${otp}</p>`})
return res.status(200).json({message:"Otp sent successfully",success:true});
  }



export const login=async(req,res,next)=>{

        const {email,phoneNumber,password}=req.body;
        const user=await User.findOne({$or: [
            {
              $and: [
                { email: { $exists: true } },
                { email: { $ne: null } },
                { email: email }
              ]
            },
            {
              $and: [
                { phoneNumber: { $exists: true } },
                { phoneNumber: { $ne: null } },
                { phoneNumber: phoneNumber }
              ]
            }
          ]
        });

    if(!user){
        throw new  Error("Invalid cradintials",{cause:401});
    } 
    const match=bcrypt.compareSync(password,user.password);
    if(!match){  
        throw new  Error("Invalid cradintials",{cause:401});
    }
    if(user.deletedAt){
     user.deletedAt=undefined;
     await user.save();
    }
    if(!(user.isVerified)){
      throw new Error("User not verified",{cause:401});
  }   
    const accessToken = generateToken(user._id);
    const refreshToken = generaterefreshToken(user._id);
    await Token.create({token:refreshToken,userId:user._id,type:"refresh"});
    
    return res.status(200).json({message:"user login successfully",success:true,accessToken,refreshToken});
}
export const googleLogin=async(req,res,next)=>{
 
    const {idToken} = req.body;
    const client =new OAuth2Client( "851795671125-a22v1m8afbnd64h1ah15jget51eq0t9u.apps.googleusercontent.com");
    const ticket=await client.verifyIdToken(idToken);
    const payload=ticket.getPayload();
    let user= await User.findOne({email:payload.email});
    if(!user){
       user=await User.create({email:payload.email,fullName:payload.name,
        phoneNumber:payload.phone,dob:payload.birthdate,isVerified:true,userAgent:"google"});
    }
    const accessToken=generateToken(user._id);
    const refreshToken=generaterefreshToken(user._id);
    return res.status(200).json({message:"user login successfully",success:true,accessToken,refreshToken,user});
}


export const refresh=async(req,res,next)=>{
    const token=req.headers.authorization;
    const payload= verifyToken(token,"julisdfghnvbn");
    const id=payload.id;
    const newAccessToken=generateToken(id);
    const newRefreshToken=generaterefreshToken(id);
    return res.status(200).json({message:"user login successfully",success:true,accessToken:newAccessToken,refreshToken:newRefreshToken});
}


export const resetPassword =async(req,res,next)=>{
  const{otp,email,NewPassword}=req.body;
  const user = await User.findOne({email});
  if(!user){
    throw new Error("User not found",{cause:404});
  }
  if(otp!==user.otp){
    throw new Error("Invalid otp",{cause:401});
  }
  if(user.otpExpired<Date.now()){
    throw new Error("Otp expired",{cause:401});
  }
  user.otp=undefined;
  user.otpExpired=undefined;
  user.password=hashPassword(NewPassword);
  user.CredentialsUpdatedAt=Date.now();
  await user.save();
  await Token.deleteMany({userId:user._id,type:"refresh"});
  return res.status(200).json({message:"password reset successfully",success:true});
}

export const logout=async(req,res,next)=>{

  const token=req.headers.authorization;
  await Token.create({token,user:req.user._id});
  return res.status(200).json({message:"user logout successfully",success:true});
  

}