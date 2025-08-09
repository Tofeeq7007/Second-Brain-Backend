import type { NextFunction , Request,Response} from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{

    const header = req.headers["authorization"];
    const decoded = jwt.verify(header as string, JWT_SECRET )
    if(decoded){
        //@ts-ignore
        req.userId =decoded.id;
        next();
    }
    else{
        res.status(411).json({
            message:"User Already exists"
        })
    }
}