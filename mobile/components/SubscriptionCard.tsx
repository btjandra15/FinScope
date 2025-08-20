import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/colors';

const SubscriptionCard = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Cost: </Text>
        <Text style={styles.balanceAmount}>${parseFloat(summary.totalCost as string).toFixed(2)}</Text>

        <View style={styles.balanceStats}>
            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Monthly</Text>

                <Text style={[styles.balanceStatAmount, {color: COLORS.income}]}>
                    +${parseFloat(summary.totalCost as string).toFixed(2)}
                </Text>
            </View>

            <View style={[styles.balanceStatItem, styles.statDivider]}/>

            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Yearly</Text>

                <Text style={[styles.balanceStatAmount, {color: COLORS.expense}]}>
                    -${parseFloat(summary.totalCost as string).toFixed(2)}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default SubscriptionCard;