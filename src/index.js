import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

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

/* ======================
   Static Files - Serve APK
====================== */
// Serve files from 'public' folder
app.use(express.static(path.join(__dirname, '../public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive');
            res.setHeader('Content-Disposition', 'attachment; filename="app-release.apk"');
        }
    }
}));

// Direct route for APK download
app.get('/app-release.apk', (req, res) => {
    const apkPath = path.join(__dirname, '../public', 'app-release.apk');
    res.download(apkPath, 'app-release.apk', (err) => {
        if (err) {
            res.status(404).send('APK not found');
        }
    });
});

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
   Start Server
====================== */
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`✅ APK available at: http://localhost:${PORT}/app-release.apk`);
});