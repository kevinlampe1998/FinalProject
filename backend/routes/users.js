import express from "express";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import User from "../models/user.js";
import Admin from '../models/admin.js';

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            street,
            postalCode,
            town,
            birthDay,
            password,
        } = req.body;
        console.log(req.body);

        if (
            !firstName ||
            !lastName ||
            !email ||
            !street ||
            !postalCode ||
            !town ||
            !birthDay ||
            !password
        ) {
            res.json({ message: "One of the inputs is missing!" });
            return;
        }

        const hash = await bcrypt.hash(password, process.env.SALT);
        console.log(hash);

        const existUser = await User.findOne({ email });
        if (existUser) {
            res.json({ message: "User exists already!" });
            return;
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            street,
            postalCode,
            town,
            birthDay,
            hash,
        });
        console.log(newUser);

        const savedUser = await newUser.save();
        savedUser.hash = undefined;

        res.json({ message: "User successful registered!", savedUser });
        return;
    } catch (err) {
        console.log("Error on POST /users/register", err);
        res.json("Something went wrong!");
        return;
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if ((!email, !password)) {
            res.json({ message: "Email or Password is wrong!" });
            return;
        }

        const admin = await Admin.findOne({ email });
        if (admin) {
            password === admin.password && console.log('Admin');
            password === admin.password && res.json({ message: 'Admin logged in!', admin });
            if (password === admin.password) return;

        }

        const searchedUser = await User.findOne({ email });

        if (!searchedUser) {
            res.json({ message: "User not found!" });
            return;
        }

        const comparePassword = await bcrypt.compare(
            password,
            searchedUser.hash
        );

        if (!comparePassword) {
            res.json({ message: "Password wrong!" });
            return;
        }

        const token = jwt.sign(
            { userId: searchedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        searchedUser.hash = undefined;

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 3_600_000,
            sameSite: "Strict",
        });
        res.json({
            message: "User successful logged in!",
            login: true,
            searchedUser,
        });
        return;
    } catch (err) {
        console.log("Error on POST /users/login", err);
        res.json("Something went wrong!");
        return;
    }
});

router.post("/login-at-start", async (req, res) => {
    try {

        if (!req.cookies || !req.cookies.token) {
            res.json({ message: "No cookie" });
            return;
        }

        const verify = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

        if (!verify) {
            res.json({ message: 'Cookie verification unsuccessful!' });
            return;
        };

        const searchedUser = await User.findOne({ _id: verify.userId });

        if (!searchedUser) {
            res.json({ message: 'Token: User not found!' });
            return;
        };

        searchedUser.hash = undefined;

        res.json({
            message: "Cookies are correct!",
            login: true,
            searchedUser,
        });
        return;
    } catch (err) {
        console.log("Error on POST /users/login-at-start", err);
        res.json("Something went wrong!");
        return;
    }
});

router.post('/logout', async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            path: '/'
        });
        res.json({ message: 'Cookie deleted!' });
        return;

    } catch (err) {
        console.log('Error on POST /users/logout', err);
        res.json('Something went wrong!');
        return;
    }
});

export default router;
