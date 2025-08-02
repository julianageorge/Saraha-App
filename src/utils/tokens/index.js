import jwt from "jsonwebtoken";
export const generateToken=(id)=>{
    return jwt.sign({id},"kkjhgfdsasdfghjkl",{expiresIn:"4h"});
}
const refreshToken=[];
export const generaterefreshToken=(id)=>{
    const token= jwt.sign({id},"julisdfghnvbn",{expiresIn:"7d"});
    refreshToken.push(token);
    return token;
}
