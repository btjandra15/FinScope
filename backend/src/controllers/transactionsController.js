import { sql } from '../config/db.js';

const getSummary = async(req, res) => {
    try {
        const { userId } = req.params;
        const totalBalance = await sql`SELECT COALESCE(SUM(amount), 0) AS total_balance FROM transactions WHERE user_id = ${userId}`;
    
        const totalIncome = await sql`
            SELECT COALESCE(SUM(amount), 0) AS total_income FROM transactions WHERE user_id = ${userId} AND amount > 0
        `;
    
        const expneses = await sql`
            SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
        `;
    
        res.status(200).json({
            totalBalance: totalBalance[0].total_balance,
            totalIncome: totalIncome[0].total_income,
            expenses: expneses[0].expenses
        });
    } catch (error) {
        console.error("Error fetching transaction summary:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getTransaction = async(req, res) => {
    try{
        const {userId} = req.params;
    
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`;
    
        res.status(200).json(transactions);
    }catch(err){
        console.error("Error fetching transactions:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const createTransaction = async(req, res) => {
    try{
        const {title, amount, category, user_id} = req.body;
    
        if(!title || !user_id || !category || amount === undefined){
            return res.status(400).json({ error: "Missing required fields" });
        };
    
        const transaction = await sql`
            INSERT INTO transactions (user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
        `;
    
        console.error("Transaction created:", transaction[0]);
        res.status(201).json(transaction[0]);
    }catch(err){
        console.error("Error creating transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const deleteTransaction = async(req, res) => {
    try{
        const {id} = req.params;
    
        if(isNaN(parseInt(id))){
            return res.status(400).json({ error: "Invalid transaction ID" });
        }
    
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING *`;
    
        if(result.length === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }   
    
        console.log("Transaction deleted:", result[0]);
        res.status(200).json(result[0]);
    }catch(err){
        console.error("Error deleting transaction:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }  
}

export { getSummary, getTransaction, createTransaction, deleteTransaction };