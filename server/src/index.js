import "dotenv/config";
import app from "./app";

// Server listening
app.listen(app.get("port"), () => {
    console.log(`${app.get("title")} listening at the port ${app.get("port")}`);
});