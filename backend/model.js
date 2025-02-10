import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    ogURL : String,
    shortURL : String,
});

const URL = mongoose.model('URL',linkSchema);

export default URL;