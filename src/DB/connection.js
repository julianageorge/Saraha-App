import mongoose from "mongoose";
 const ConnectDB=()=>{
    mongoose.connect("mongodb://localhost:27017/saraha").then(()=>[
        console.log("Connected to MongoDB")
    ]).catch((err)=>{
        console.log("fail to connect data base",err)
    })


}
export default ConnectDB;