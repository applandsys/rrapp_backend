import app from "./app.js";
import { pool } from "./config/database.js";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // simple DB test
        await pool.query("SELECT 1");
        console.log("✅ Database check passed");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to start server", err);
        process.exit(1);
    }
}

startServer();

/* Graceful shutdown */
process.on("SIGINT", async () => {
    console.log("🔻 Shutting down...");
    await pool.end();
    process.exit(0);
});
