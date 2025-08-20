import ConnectDB from "./DB/connection.js";
import {authRouter,userRouter,messageRouter} from "./module/index.js";
import cors from "cors";
import fs from "fs";
import { DeleteUnverifiedUsers } from "./module/user/user.service.js";
import { globalErrorHandler } from "./utils/error/index.js";
import rateLimit from "express-rate-limit";
export const bootstrap=(app,express)=>{
    const limiter=rateLimit({
        windowMs:60*1000,
        max:3,
       // message:"Too many requests from this IP, please try again after a minute",
        handler:(req,res,next,options)=>{
            throw new Error("Too many requests from this IP, please try again after a minute",{cause:429});
        },
        //legacyHeaders:false,
        skipSuccessfulRequests:true,
        identifier:(req,res,next)=>{
            return req.ip;
        }
    })
    app.use(limiter);
    app.use(express.json());
    app.use("/Uploads",express.static("Uploads"));
    app.use(cors({origin:"*"}));
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/message",messageRouter);
    ConnectDB();
    app.use(globalErrorHandler);

    DeleteUnverifiedUsers();


}