import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// GET /api/products/search
router.get("/search", async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.json([]);
        }

        const products = await Product.find({
            $or: [
                { hersteller: { $regex: query, $options: "i" } },
                { modell: { $regex: query, $options: "i" } },
                {
                    "spezifikationen.prozessor.name": {
                        $regex: query,
                        $options: "i",
                    },
                },
                {
                    "spezifikationen.grafik.name": {
                        $regex: query,
                        $options: "i",
                    },
                },
            ],
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
