import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({
    name:String,
    email:String,
    image:String,
    height:Number,
    build:String,
    birthday:Date,
    gender:String,
    isAdmin:Boolean
});

export default mongoose.models.User || mongoose.model("User",userSchema);