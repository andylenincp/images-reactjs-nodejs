import express from "express";
import morgan from "morgan";
import multer from "multer";
import path from "path";
import cors from "cors";

import Routes from "./routes/routes";

// Initializations
const app = express();
import "./database";

// Settings
app.set("title", "images-reactjs-nodejs");
app.set("port", process.env.port || 5000);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const storage = multer.diskStorage({
    destination: path.join(__dirname, "./images"),
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-innovbec-" + file.originalname);
    }
});
app.use(multer({storage}).single("image"));
app.use(cors());

// Routes
app.use(Routes);

export default app;