import Express from "express";
import { userMiddleware } from "../middleware.js";
import { searchAndAnswer } from "../controller/query.controller.js";
const router = Express.Router();
router.post("/query", userMiddleware, searchAndAnswer);
export default router;
//# sourceMappingURL=query_route.js.map