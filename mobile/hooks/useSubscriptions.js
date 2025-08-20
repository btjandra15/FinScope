import { useCallback } from "react";
import { useState } from "react";
import { Alert } from "react-native";

const API_URL = "https://finscope-km3n.onrender.com/api";

export const useSubscriptions = (userID) => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [summary, setSummary] = useState({totalCost: 0});
    const [loading, setLoading] = useState(true);

    const fetchSubscriptions = useCallback(async() => {
        try {
            const res = await fetch(`${API_URL}/subscriptions/${userID}`);
            const data = await res.json();

            setSubscriptions(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching subscriptions:", error);
        }
    }, [userID]);

    const fetchSummary = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/subscriptions/summary/${userID}`);
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
            await Promise.all([fetchSubscriptions(), fetchSummary()]);
        } catch (error) {
            console.error("Error loading data:", error);
        }finally {
            setLoading(false);
        }
    }, [fetchSubscriptions, fetchSummary, userID]);

    const deleteSubscription = useCallback(async (id) => {
        try {
            const res = await fetch(`${API_URL}/subscriptions/${id}`, {
                method: "DELETE",
            });

            if(!res.ok) throw new Error("Failed to delete subscription");

            loadData();
            Alert.alert("Subscription deleted successfully");
        } catch (error) {
            console.error("Error deleting subscription:", error);
            Alert.alert("Failed to delete subscription");
        }
    });

    return {subscriptions, summary, loading, loadData, deleteSubscription};
}