import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import Image from '../models/image.js';
import UsedItem from '../models/usedItem.js';

import express from 'express';
const router = express.Router();

dotenv.config();
const env = process.env;


cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: [ 'jpg', 'png', 'jpeg' ]
    }
});

const upload = multer({ storage });

router.post('/:_id', upload.single('file'), async (req, res) => {
    try {
        const { _id } = req.params;
        console.log('_id', _id);
        if (!_id) return res.json({ message: '_id is missing!', error: true });
    
        const newImage = new Image({
            url: req.file.path,
            public_id: req.file.filename
        });
        console.log('newImage', newImage);
        if (!newImage) return res.json({ message: 'Error creating new image!', error: true });
        
        const savedImage = await newImage.save();
        console.log('savedImage', savedImage);
        if (!savedImage) return res.json({ message: 'Error saving new image!', error: true });
        
        const product = await UsedItem.updateOne({ _id },
            { main_picture: savedImage });
        console.log('product', product);
        if (!product) return res.json({ message: 'Error updating usedItem!', error: true });
    
        res.json({ message: 'Image successful saved!',
            image: savedImage });

    } catch (err) {
        console.log('Error on POST /images/:_id');
        res.json({ message: 'Image: Something went wrong!' });
        return;
    } 
});

export default router;