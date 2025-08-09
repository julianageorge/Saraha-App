import mongoose, { Schema } from "mongoose";

const schema=new Schema({
    
        userId: { 
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
             },
             token:{type:String,required:true},


},
{timestamps:true})
export const model=model("Token",schema);