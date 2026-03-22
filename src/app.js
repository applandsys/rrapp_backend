import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";

const app = express();

app.use(express.json());            // ✅ parse JSON body
app.use(express.urlencoded({ extended: true })); // ✅ parse form data

/* ======================
   Global Middlewares
====================== */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* ======================
   API Routes
====================== */
routes(app);

/* ======================
   Health Check
====================== */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        service: "ERP Backend",
        timestamp: new Date()
    });
});

/* ======================
   Global Error Handler
====================== */
app.use(express.static("../public", {
    setHeaders: (res, path) => {
        if (path.endsWith(".apk")) {
            res.setHeader("Content-Type", "application/vnd.android.package-archive")
        }
    }
}))
app.use(errorHandler);

export default app;
