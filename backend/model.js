import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    ogURL : String,
    shortURL : String,
    clicks : {type:Number,default:0}
});

const URL = mongoose.model('URL',linkSchema);

export default URL;