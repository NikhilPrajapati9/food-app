import cors from "cors";
import express from "express";
import type { Application } from "express";
import cookieParser from "cookie-parser";

const app: Application = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

//routes
import menuRoute from "./routes/menu.routes.ts"
import userRoutes from "./routes/user.routes.ts";
import orderRoute from "./routes/order.routes.ts"
import restaurantRoute from "./routes/restaurant.routes.ts"
import healthcheckRouter from "./routes/healthcheck.routes.ts";


app.use("/api/v1/users", userRoutes);
app.use("/api/v1/menu", menuRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/restaurant", restaurantRoute);
app.use("/api/v1/healthcheck", healthcheckRouter);

export { app };
