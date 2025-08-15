import mongoose from "mongoose";
 const ConnectDB=()=>{
    mongoose.connect(process.env.DB_URL).then(()=>[
        console.log("Connected to MongoDB")
    ]).catch((err)=>{
        console.log("fail to connect data base",err)
    })


}
export default ConnectDB;