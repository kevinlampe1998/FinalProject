import express from "express";
import Product from "../models/product.js";
import fs from "fs";

const router = express.Router();

// DELETE /api/products/:id - Delete a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// PUT /api/products/:id - Update a product by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// POST /api/products/many - Insert multiple products from a .json file
router.post("/many", async (req, res) => {
    try {
        const productsData = JSON.parse(
            fs.readFileSync("path/to/products.json", "utf-8")
        );

        const insertedProducts = await Product.insertMany(productsData);

        res.json({
            message: "Products inserted successfully",
            insertedProducts,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
