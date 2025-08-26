
import { app } from "./app.ts";
import { connectDB } from "./db/index.ts";
import dotenv from "dotenv"

dotenv.config()

const PORT = process.env.PORT || 3000;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server listen on http://localhost:${PORT}`);
        })
    })
    .catch(err => console.log("Mongo db connect error: ", err))
