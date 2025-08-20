import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';
import { useRouter } from 'expo-router';

const NoSubscriptionsFound = () => {
    const router = useRouter();

    return (
        <View style={styles.emptyState}> 
        <Ionicons name='receipt-outline' size={60} color={COLORS.textLight}/>
        <Text style={styles.emptyStateTitle}>No Subscriptions Found</Text>

        <Text style={styles.emptyStateText}>
            Start tracking your subscriptions by adding your first subscription!
        </Text>

        <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push('/createSubscriptions')}>
            <Ionicons name='add-circle' size={18} color={COLORS.white} />
            <Text style={styles.emptyStateButtonText}>Add Subscriptions</Text>
        </TouchableOpacity>
        </View>
    )
}

export default NoSubscriptionsFound;