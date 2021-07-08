import { Router } from "express";
import * as imagesController from "../controllers/images.controller";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json("API");
});

router.post("/images/post", imagesController.createImage);

export default router;