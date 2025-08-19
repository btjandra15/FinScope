import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import job from "./config/cron.js";

dotenv.config();

const app = express();

// if(process.env.NODE_ENV === "production") job.start()

const PORT = process.env.PORT;

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: "Server is healthy" });
})

app.use(rateLimiter);
app.use(express.json());

const initDB = async() => {
    try{
        await sql`CREATE TABLE IF NOT EXISTS transactions(
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,
            title VARCHAR(255) NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            category VARCHAR(255) NOT NULL,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE
        )`;

        console.log("Database initialized successfully");
    }catch(err){
        console.error("Database initialization failed:", err);
        process.exit(1);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port 5001");
    });
});

app.use('/api/transactions', transactionsRoute);