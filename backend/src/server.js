import express from "express";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import subscriptionRoute from "./routes/subscriptionRoute.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// app.use(rateLimiter);
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

        await sql` CREATE TABLE IF NOT EXISTS subscriptions (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255) NOT NULL,         
            service_name VARCHAR(100) NOT NULL,
            category VARCHAR(50),                   
            amount DECIMAL(10, 2) NOT NULL,        
            billing_cycle VARCHAR(50) NOT NULL,     
            start_date DATE NOT NULL,
            renewal_date DATE,                      
            status VARCHAR(50) DEFAULT 'active',    -- Active, Canceled, Paused
            notes TEXT,
            created_at DATE NOT NULL DEFAULT CURRENT_DATE,
            updated_at TIMESTAMPTZ DEFAULT NOW()
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
app.use('/api/subscriptions', subscriptionRoute);