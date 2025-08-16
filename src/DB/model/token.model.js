import mongoose, { Schema,model } from "mongoose";

const schema=new Schema({
    
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
             },
        token:{type:String,required:true},
        type:{
            type:String,
            enum:["refresh","access"],
            default:"refresh"
        }


},
{timestamps:true})
const Token= model("Token",schema);
export default Token;