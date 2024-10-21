import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const env = process.env;

mongoose.connect(env.MONGODB_URI)
    .then(() => console.log('MONGODB connected!'))
    .catch((err) => console.log('Error connecting MONGODB!: ', err));

const app = express();

app.use(cors());
app.use(express.json());


app.listen(env.PORT, () => {
    console.log(`Server started on http://localhost:${env.PORT}`);
});