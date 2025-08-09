import ConnectDB from "./DB/connection.js";
import {authRouter,userRouter,messageRouter} from "./module/index.js";
import cors from "cors";
import fs from "fs";
import { DeleteUnverifiedUsers } from "./module/user/user.service.js";
export const bootstrap=(app,express)=>{

    app.use(express.json());
    app.use("/Uploads",express.static("Uploads"));
    app.use(cors({origin:"*"}));
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/message",messageRouter);
    ConnectDB();

    app.use((err,req,res,next)=>{
        if(req.file){
            fs.unlinkSync(req.file.path);
        }
        return res.status(err.cause||500).json({message:err.message,success:false,stack:err.stack});
    });
    DeleteUnverifiedUsers();


}