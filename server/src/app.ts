import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//routes
import healthcheckRouter from "./routes/healthcheck.routes.ts";
import userRoutes from "./routes/user.routes.ts";

app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRoutes);

export { app };
