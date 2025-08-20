import { sql } from "../config/db.js";

const createSubscription = async(req, res) => {
    try {
        const { user_id, service_name, category, amount, billing_cycle, start_date, renewal_date, status, notes } = req.body;

        if(!user_id || !service_name || !amount || !billing_cycle || !start_date) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await sql`
            INSERT INTO subscriptions (user_id, service_name, category, amount, billing_cycle, start_date, renewal_date, status, notes)
            VALUES (${user_id}, ${service_name}, ${category}, ${amount}, ${billing_cycle}, ${start_date}, ${renewal_date}, ${status}, ${notes})
            RETURNING *
        `;

        console.log("Subscription created:", result[0]);
        res.status(201).json(result[0]);
    } catch (error) {
        console.error("Error creating subscription:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getSubscription = async(req, res) => {
    try {
        const { userId } = req.params;
        const subscriptions = await sql`SELECT * FROM subscriptions WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const updateSubscription = async(req, res) => {
    try {
        const { id } = req.params;
        const { service_name, category, amount, billing_cycle, start_date, renewal_date, status, notes } = req.body;
        if(isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid subscription ID" });
        }

        const result = await sql`
            UPDATE subscriptions
            SET service_name = ${service_name}, category = ${category}, amount = ${amount}, billing_cycle = ${billing_cycle},
                start_date = ${start_date}, renewal_date = ${renewal_date}, status = ${status}, notes = ${notes},
                updated_at = CURRENT_DATE
            WHERE id = ${id}
            RETURNING *
        `;
        if(result.length === 0) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        console.log("Subscription updated:", result[0]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error updating subscription:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }       
};

const deleteSubscription = async(req, res) => {
    try {
        const { id } = req.params;
        if(isNaN(parseInt(id))) {
            return res.status(400).json({ error: "Invalid subscription ID" });
        }

        const result = await sql`DELETE FROM subscriptions WHERE id = ${id} RETURNING *`;
        if(result.length === 0) {
            return res.status(404).json({ error: "Subscription not found" });
        }           

        console.log("Subscription deleted:", result[0]);
        res.status(200).json(result[0]);
    } catch (error) {
        console.error("Error deleting subscription:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }   
};

const getSummary = async(req, res) => {
    try {
        const {userId} = req.params;
        const totalCost = await sql`SELECT COALESCE(SUM(amount), 0) AS total_cost FROM subscriptions WHERE user_id = ${userId}`;

        res.status(200).json({totalCost: totalCost[0].total_cost})
    } catch (error) {
        console.error("Error getting summary for subscriptions:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export {createSubscription, getSubscription, updateSubscription, deleteSubscription, getSummary};