import express from 'express';
const app = express();
app.use(express.json());
import mongoose from 'mongoose';
import cors from 'cors';
app.use(cors());
import {nanoid} from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();
import URL from './model.js';

mongoose.connect(process.env.dburl)
.then(()=>{console.log("Database connected!!!");})
.catch((error)=>{console.log("Database connection failed!!! ",error);});

app.post('/api/short', async (req,res)=>{
    try {
        const {ogURL} = req.body;
        if(!ogURL) {
            res.status(404).json({message:"Enter URL PLS",error});
        }
        
        let shortURL = nanoid(3);
        let collision = await URL.findOne({shortURL});
        if(collision) {
            shortURL = nanoid(3);
        }
        collision = await URL.findOne({shortURL});
        let i = 4;
        while(collision && i<=10) {
            shortURL = nanoid(i);
            collision = await URL.findOne({shortURL});
            i++;
        }
        if(collision) {
            return res.status(500).json({message:"Failed to generate a unique short URL"});
        }
        const url = new URL({ogURL,shortURL});
        await url.save();
        return res.status(200).json({message:"URL Generated",url});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"URL Not Generated",error});
    }
});

app.get('/:shortURL',async (req,res)=> {
    try {
        const {shortURL} = req.params;
        const url = await URL.findOne({shortURL});
        if(url) {
            url.clicks++;
            await url.save();
            return res.redirect(url.ogURL);
        }
        else {
            return res.status(404).json({message:"URL NOT FOUND"});
        }
    } catch (error) {
        console.log(error);
        res.status(501).json({message:"URL Not Generated",error});
    }
});

app.listen(8080,()=>{
    console.log(`Server runnning on 8080`);
})
