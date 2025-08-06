import Express from "express";
import { user_signin, user_signUp } from "../controller/auth.controller.js";
const user_route = Express.Router();
user_route.post("/signup", user_signUp);
user_route.post("/signin", user_signin);
export default user_route;
//# sourceMappingURL=user_route.js.map