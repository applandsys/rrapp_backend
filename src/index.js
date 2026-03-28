import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================
// DEBUG: Check APK file path
// ============================================
console.log('📁 Current directory (__dirname):', __dirname);
console.log('📁 Looking for APK at:', path.join(__dirname, '../public', 'app-release.apk'));
console.log('📁 Full path:', path.resolve(__dirname, '../public', 'app-release.apk'));
// ============================================

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
            console.error('❌ Error downloading APK:', err);
            res.status(404).send('APK not found');
        } else {
            console.log('✅ APK downloaded successfully');
        }
    });
});

// ============================================
// CHECK APK FILE EXISTENCE
// ============================================
app.get('/check-apk', (req, res) => {
    const apkPath = path.join(__dirname, '../public', 'app-release.apk');
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
        res.status(500).json({
            error: error.message,
            path: apkPath
        });
    }
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
    console.log(`✅ Health check at: http://localhost:${PORT}/health`);
    console.log(`✅ APK check at: http://localhost:${PORT}/check-apk`);
});