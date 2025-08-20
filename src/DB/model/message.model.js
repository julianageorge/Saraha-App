import { model, Schema } from "mongoose";
const schema= Schema({
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    content:{
        type:String,
        minlength:1,
        maxlength:1000,
        require:function(){
            if(this.attachments.length>0){
                return false;
            }
            return true;

        }
    },
    attachments:[{
        secure_url:{type:String},
        public_id:{type:String}
    }]

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});
const Message=model("Message",schema);
export default Message;
