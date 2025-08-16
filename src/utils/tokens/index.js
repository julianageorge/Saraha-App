import jwt from "jsonwebtoken";
export const generateToken=(id)=>{
    return jwt.sign({id},"kkjhgfdsasdfghjkl",{expiresIn:"1m"});
}
const refreshToken=[];
export const generaterefreshToken=(id)=>{
    const token= jwt.sign({id},"julisdfghnvbn",{expiresIn:"7d"});
    refreshToken.push(token);
    return token;
}
export const verifyToken=(token,secretKey="kkjhgfdsasdfghjkl")=>{
    return jwt.verify(token,secretKey);

}
