import express from "express";
import { bootstrap } from "./app.controller.js";
import dotenv from "dotenv"
dotenv.config({path:"config/local.env"});
const app=express();
const PORT=process.env.PORT||3000;
bootstrap(app,express);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})