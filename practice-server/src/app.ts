import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
const app: Application = express();

app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

export default app;
