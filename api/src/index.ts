import "reflect-metadata";
import express ,{Request,Response,NextFunction}from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes/routes";
import { connectDB } from "./config/database";


dotenv.config();
connectDB()

const app = express();
app.use(express.json());
app.use(helmet())
app.use(morgan("dev"));
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Authorization", "Content-Type"],
        credentials: true,
    })
);

app.use('/',routes);
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error("Global Error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});