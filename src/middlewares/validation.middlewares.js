import joi from "joi";
export const isvalid=(schema)=>{
    return (req,res,next)=>{
       const {value,error}=schema.validate(req.body,{abortEarly:false});
       if(error){
        let errMassages=error.details.map((detail)=>{
          return detail.message;
        });
        errMassages=errMassages.join(" , ")
        throw new Error(errMassages,{cause:400});
       }
       next();
    }
}

export const generalFields={
  email:joi.string().email({tlds:["com","eg","org"]}),
  phoneNumber:joi.string().min(11).max(11),
  password:joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).min(4).required(),
  fullName:joi.string().min(5).max(15).required(),
  dob:joi.date(),
  rePassword:(ref)=>joi.string().required().valid(joi.ref(ref))
}