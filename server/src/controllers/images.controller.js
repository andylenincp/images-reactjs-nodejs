import { Image } from "../models";

export const createImage = async (req, res) => {
    try {
        const { mimetype, originalname, filename } = req.file;
        await Image.create({
            mimetype,
            originalname,
            filename: "../images/" + filename
        })
        res.status(201).json({ message: "Image saved" });
    } catch (error) {
        res.status(400).send({ message: "An error has occurred" });
    }
};