import { ContentModel, TagsModel, UserModel } from "../db.js";
export const Push_Content = async (req, res) => {
    const link = req.body.link;
    const title = req.body.title;
    const tag = req.body.tag;
    const Tag = await TagsModel.create({
        tag: tag
    });
    await ContentModel.create({
        link,
        title,
        type: req.body.type,
        //@ts-ignore
        userId: req.userId,
        tags: Tag._id,
    });
    res.json({
        message: "Content added"
    });
};
export const Get_Content = async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId
    }).populate("userId", "name");
    res.json({
        content
    });
};
export const RemoveContent = async (req, res) => {
    //@ts-ignore
    const userId = req.userId;
    const contentId = req.body.contentId;
    const content = await ContentModel.deleteOne({
        _id: contentId
    });
    res.json({
        message: "Content Deleted Successfully"
    });
};
//# sourceMappingURL=content.controller.js.map