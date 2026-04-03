import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

import routes from "./routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/* ======================
   Global Middlewares
====================== */
app.use(helmet());
app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

/* ======================
   Static Files - Serve APK
====================== */
// Safely point to the public folder from the src folder
const publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="app-release.apk"');
        }
    }
}));

/* ======================
   APK Debug & Download Routes
====================== */
// Direct route for APK download (Bulletproof method)
app.get('/app-release.apk', (req, res) => {
    const apkPath = path.join(publicPath, 'app-release.apk');
    res.download(apkPath, 'app-release.apk', (err) => {
        if (err) {
            console.error('❌ Error downloading APK:', err);
            res.status(404).send('APK not found');
        }
    });
});

// The magical debug route
app.get('/check-apk', (req, res) => {
    const apkPath = path.join(publicPath, 'app-release.apk');
    try {
        const exists = fs.existsSync(apkPath);
        const stats = exists ? fs.statSync(apkPath) : null;
        res.json({
            path: apkPath,
            exists: exists,
            size: stats ? stats.size : 0,
            message: exists ? 'APK file found' : 'APK file NOT found'
        });
    } catch (error) {
        res.status(500).json({ error: error.message, path: apkPath });
    }
});

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
        service: "RIDA APK Server",
        timestamp: new Date()
    });
});

/* ======================
   Global Error Handler
====================== */
app.use(errorHandler);

export default app;
