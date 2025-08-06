import mongoose from "mongoose";

mongoose.connect('mongodb+srv://Tofeeq:20fQSIsEP72YykIy@cluster0.kikxzbk.mongodb.net/Brainly');
enum Tag_type {
    Facebook = 'Facebook',
    Twitter = 'twitter',
    Youtube = 'youtube',
}
const {Schema} = mongoose;
const UserSchema = new Schema({
    name:{type:String , unique:true},
    password:String
})


// Tag Schema
const TagsSchema = new Schema({
    tag:String,
})

// Content Schema
const ContentSchema = new Schema({
    title:String,
    link:String,
    type:String,
    tags: {type:Schema.Types.ObjectId, ref:'Tags'},
    userId:{type:Schema.Types.ObjectId, ref:'User',required:true},
    
});

// Link Schema
const LinkSchema = new Schema({
    hash:String,
    userId:{type:Schema.Types.ObjectId, ref:'User'
        ,required:true, unique:true
    }
})

export const UserModel = mongoose.model('User',UserSchema);
export const ContentModel = mongoose.model("Content",ContentSchema);
export const TagsModel = mongoose.model("Tags",TagsSchema);
export const LinkModel = mongoose.model("Links",LinkSchema);