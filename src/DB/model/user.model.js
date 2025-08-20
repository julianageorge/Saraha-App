import { model, Schema } from "mongoose";
const schema = new Schema({
    firstName:{type:String,required:true,trim:true,lowercase:true},
    lastName:{type:String,required:true,trim:true,lowercase:true},
    email:{
        type:String,
        required:function(){
            if(this.phoneNumber){
                return false;
            }
            return true;
         },
          trim:true,
          lowercase:true},
    password:{
        type:String,
        required:function(){
            if(this.userAgent==="google"){
                return false;
            }
            return true;
        }
    },
    phoneNumber:{
        type:String,
        required:function(){
           if(this.email){
            return false;
           }
           return true;
        },
    },
    dob:{
        type:Date,
        required:true
    },
    otp:{
        type:Number
    },
    otpExpired:{
        type:Date,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    userAgent:{
        type:String,
        enum:["local","google"],
        default:"local"
    },
    ProfilePic:{
       secure_url:{type:String},
       public_id:{type:String},
       

    },
    lastActive:{
        type:Date,
        default:Date.now()
    },
    CredentialsUpdatedAt:{
        type:Date,
        default:Date.now()
    }

},
{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});
schema.virtual("fullName").get(function(){
    return `${this.firstName} ${this.lastName}`;
});
schema.virtual("fullName").set(function(value){
    const name=value.split(" ");
    this.firstName=name[0];
    this.lastName=name[1];

});
schema.virtual("age").get(function(){
    return new Date().getFullYear()-new Date(this.dob).getFullYear();
})

const User=model("User",schema);
export default User;