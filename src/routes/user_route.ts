
import Express  from "express";
import { checkLogin, user_signin, user_signUp } from "../controller/auth.controller.js";
import { userMiddleware } from "../middleware.js";

const user_route = Express.Router();

user_route.post("/signup", user_signUp)

user_route.post("/signin", user_signin)
user_route.post("/check",userMiddleware,checkLogin)
export default user_route;