import express from "express";
import { bootstrap } from "./app.controller.js";
import dotenv from "dotenv"
import User from "./DB/model/user.model.js";
import { DeleteUnverifiedUsers } from "./module/user/user.service.js";
import cron from "node-cron";
import { deleteFiles } from "./utils/cloud/cloudinary.config.js";
import Message from "./DB/model/message.model.js";
dotenv.config({path:"config/local.env"});
const app=express();
const PORT=process.env.PORT||3000;
bootstrap(app,express);
DeleteUnverifiedUsers();
cron.schedule(` 58 21 * * *`,async()=>{
    const users = await User.find({deletedAt:{$lte:Date.now()-3*30*24*60*60*1000}});
    for(let user of users){
        if(user.ProfilePic.public_id){
        await deleteFiles(`saraha/${user._id}`);
    }
    }

    await User.deleteMany({deletedAt:{$lte:Date.now()-3*30*24*60*60*1000}});
    await Message.deleteMany({receiver:{$in:users.map(user=>user._id)}});
    console.log("deleted")
})


app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})