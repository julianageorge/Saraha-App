import ConnectDB from "./DB/connection.js";
import {authRouter,userRouter,messageRouter} from "./module/index.js";
import cors from "cors";
export const bootstrap=(app,express)=>{

    app.use(express.json());
    app.use(cors({origin:"*"}));
    app.use("/auth",authRouter);
    app.use("/user",userRouter);
    app.use("/message",messageRouter);
    ConnectDB();
    //global error handler
    app.use((err,req,res,next)=>{
        return res.status(err.cause||500).json({message:err.message,success:false,stack:err.stack});
    });


}