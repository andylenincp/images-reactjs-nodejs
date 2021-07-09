import { Image } from "../models";
import fs from "fs-extra";

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

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        const image = await Image.findByPk(id);
        fs.unlink("src/images/" + image.filename);
        await Image.destroy({ where: { id } });
        res.status(200).json({ message: "Image deleted" });
    } catch (error) {
        res.status(400).send({ message: "An error has occurred" });
    }
}