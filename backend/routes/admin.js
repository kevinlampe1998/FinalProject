import express from 'express';
import Admin from '../models/admin.js';
const router = express.Router();

router.route('/').post(async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        console.log(newAdmin);
        !newAdmin && console.log('Error creating Admin!');

        const savedAdmin = await newAdmin.save();
        console.log(newAdmin);
        !savedAdmin && console.log('Error saving new Admin!');

        res.json({ message: 'Admin created!' });
        return;

    } catch (err) {
        console.log('Error on POST /admin', err);
        res.json({ message: 'Something went wrong!' });
        return;
    }
});

export default router;