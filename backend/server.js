import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

import usersRoute from './routes/users.js';
import productRoute from './routes/product.js';
import Image from './models/image.js';
import Product from './models/product.js';

dotenv.config();
const env = process.env;

mongoose.connect(env.MONGODB_URI)
    .then(() => console.log('MONGODB connected!'))
    .catch((err) => console.log('Error connecting MONGODB!: ', err));

const app = express();
    
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/users', usersRoute);
app.use('/products', productRoute);

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

app.post('/images/:_id', upload.single('file'), async (req, res) => {
    try {
        const { _id } = req.params;
    
        const newImage = new Image({
            url: req.file.path,
            public_id: req.file.filename
        });
    
        const savedImage = await newImage.save();
    
        const product = await Product.updateOne({ _id }, {
            $push: { main_picture: savedImage }
        });
    
        res.json({ message: 'Image successful saved!',
            image: savedImage });

    } catch (err) {
        console.log('Error on POST /images/:_id');
        res.json({ message: 'Image: Something went wrong!' });
        return;
    } 
});



app.listen(env.PORT, () => {
    console.log(`Server started on http://localhost:${env.PORT}`);
});