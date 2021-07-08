import { Router } from "express";
import { Image } from "../models";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json("API");
});

router.post("/images/post", async (req, res) => {
    try {
        const { mimetype, originalname, filename } = req.file;
        await Image.create({
            mimetype,
            originalname,
            filename: "../images" + filename
        })
        res.status(201).json({ message: "Image saved" });
    } catch (error) {
        res.status(400).send({ message: "An error has occurred" });
    }
});

export default router;