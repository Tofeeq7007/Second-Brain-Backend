import type { NextFunction , Request,Response} from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "./config.js";
export const userMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    
    const header = req.headers["authorization"];
    
    const decoded = jwt.verify(header as string, JWT_SECRET )
    if(decoded){
        if(typeof decoded === "string"){
            return res.status(403).json({
                message:"User not logged in"
            })
        }
        req.userId =(decoded as JwtPayload).id;
        next();
    }
    else{
        res.status(411).json({
            message:"User Already exists"
        })
    }
}