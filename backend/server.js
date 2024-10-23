import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRoute from './routes/users.js';
import productsRoute from './routes/products.js';
import imagesRoute from './routes/images.js';
import helpChatRoute from './routes/helpChat.js';


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
app.use('/products', productsRoute);
app.use('/images', imagesRoute);
app.use('/help-chat', helpChatRoute);


app.listen(env.PORT, () => {
    console.log(`Server started on http://localhost:${env.PORT}`);
});