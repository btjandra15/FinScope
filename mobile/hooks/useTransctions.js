import { useCallback, useState } from "react";
import {Alert} from "react-native";

const API_URL = "http://localhost:5001/api";

export const useTransactions = (userID) => {
    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({
        income: 0,
        expense: 0,
        balance: 0,
    });

    const [loading, setLoading] = useState(true);

    const fetchTransactions = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/transactions/${userID}`);
            const data = await res.json();
            setTransactions(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    }, [userID]);

    const fetchSummary = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/transactions/summary/${userID}`);
            const data = await res.json();
            setSummary(data);
        } catch (error) {
            console.error("Error fetching summary:", error);
        }
    }, [userID]);

    const loadData = useCallback(async () => {
        if(!userID) return;

        setLoading(true);

        try {
            await Promise.all([fetchTransactions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        }finally {
            setLoading(false);
        }
    }, [fetchTransactions, fetchSummary, userID]);

    const deleteTransaction = useCallback(async (id) => {
        try {
            const res = await fetch(`${API_URL}/transactions/${id}`, {
                method: "DELETE",
            });

            if(!res.ok) throw new Error("Failed to delete transaction");

            loadData();
            Alert("Transaction deleted successfully");
        } catch (error) {
            console.error("Error deleting transaction:", error);
            Alert("Failed to delete transaction");
        }
    });

    return {transactions, summary, loading, loadData, deleteTransaction};
}