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