import express from "express";
import UsedItem from "../models/product.js";

const router = express.Router();

router.get("/get-random-used-item-images", async (req, res) => {
    try {
        const usedItems = await UsedItem.aggregate([{ $sample: { size: 10 } }]);

        const products = await UsedItem.populate(usedItems, {
            path: "main_picture",
        });

        res.json({
            message: "Here are randomly some used items for the home page!",
            products,
        });
        return;
    } catch (err) {
        console.log("Error on GET /get-random-used-item-images", err);
        res.json("Something went wrong!");
        return;
    }
});

export default router;
