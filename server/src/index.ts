
import { app } from "./app.ts";
import { connectDB } from "./db/index.ts";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server is running at port : ${PORT}`);
        });
    })
    .catch((error) => {
        console.log("MONGO DB connection failed !!!", error);
    });
