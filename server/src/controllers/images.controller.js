import { Image } from "../models";

export const createImage = async (req, res) => {
    try {
        const { mimetype, originalname, filename } = req.file;
        await Image.create({
            mimetype,
            originalname,
            filename
        })
        res.status(201).json({ message: "Image saved" });
    } catch (error) {
        res.status(400).send({ message: "An error has occurred" });
    }
};

export const getImages = async (req, res) => {
    try {
        const images = await Image.findAll();
        res.status(200).json(images);
    } catch (error) {
        res.status(400).send({ message: "An error has occurred" });
    }
}