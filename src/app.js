import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================
   Global Middlewares
====================== */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* =======================
   Static Files - FIXED!
====================== */
// Serve files from 'public' folder
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="app-release.apk"');
        }
    }
}));

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
app.use(errorHandler);

export default app;