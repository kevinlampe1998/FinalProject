import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import Image from "../models/image.js";
import UsedItem from "../models/usedItem.js";
import express from "express";

const router = express.Router();
dotenv.config();
const env = process.env;

cloudinary.config({
    cloud_name: env.CLOUDINARY_CLOUD_NAME,
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "uploads",
        allowed_formats: ["jpg", "png", "jpeg"],
        transformation: [{ width: 1000, height: 1000, crop: "limit" }], // Optional: Bildgröße begrenzen
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Überprüfe den MIME-Type
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Nur JPEG und PNG Dateien sind erlaubt!"), false);
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB Limit
    },
});

router.post("/:_id", upload.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Keine Datei hochgeladen",
            });
        }

        const { _id } = req.params;
        console.log("Processing upload for product ID:", _id);

        const newImage = new Image({
            url: req.file.path,
            public_id: req.file.filename,
        });

        const savedImage = await newImage.save();
        console.log("Saved image:", savedImage);

        const updatedProduct = await UsedItem.findByIdAndUpdate(
            _id,
            { main_picture: savedImage._id }, // Verwende die Image _id als Referenz
            { new: true }
        );

        if (!updatedProduct) {
            throw new Error("Produkt nicht gefunden");
        }

        console.log("Updated product:", updatedProduct);

        res.status(200).json({
            success: true,
            message: "Image successfully saved!",
            image: savedImage,
        });
    } catch (err) {
        console.error("Error on POST /images/:_id:", err);
        res.status(500).json({
            success: false,
            message: "Fehler beim Speichern des Bildes",
            error: err.message,
        });
    }
});

export default router;
