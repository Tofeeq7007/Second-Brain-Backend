import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import user_route from "./routes/user_route.js";
import content_route from "./routes/content_route.js";
import { nanoid } from "nanoid";
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", user_route);
app.use("/api/v1", content_route);
app.use("/api/v1", content_route);
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share; // true or flase;
    // @ts-ignore
    const userId = req.userId;
    console.log(userId);
    if (share) {
        const existingLink = await LinkModel.findOne({
            userId
        });
        if (existingLink) {
            res.json({
                hash: existingLink.hash
            });
            return;
        }
        const hash = nanoid(6);
        console.log(hash);
        await LinkModel.create({
            hash,
            userId
        });
        res.json({
            hash
        });
    }
    else {
        await LinkModel.deleteOne({
            userId
        });
        res.json({
            message: "Removed link"
        });
    }
});
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    });
    if (!link) {
        res.json({
            message: "Incorrect input"
        });
        return;
    }
    const content = await ContentModel.find({
        userId: link.userId
    });
    const user = await UserModel.findOne({
        _id: link.userId
    });
    if (!user) {
        res.status(411).json({
            message: "user not found, error should ideally no happend"
        });
        return;
    }
    res.json({
        username: user.name,
        content: content
    });
});
app.listen(3000, () => {
    console.log("Server Running...");
});
//# sourceMappingURL=index.js.map