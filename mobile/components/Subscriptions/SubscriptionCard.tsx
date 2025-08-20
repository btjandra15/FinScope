import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/colors';

interface SubscriptionSummary {
  totalCost: number | string;
}

interface SubscriptionCardProps {
  summary: SubscriptionSummary;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ summary }) => {
  let yearlyCost = summary.totalCost * 12;

  return (
    <View style={styles.balanceCard}>
        <View style={styles.balanceRow}>
          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceTitle}>Monthly Cost: </Text>
            <Text style={styles.balanceAmount}>-${parseFloat(summary.totalCost as string).toFixed(2)}</Text>
          </View>

          <View style={styles.balanceStatItem}>
            <Text style={styles.balanceTitle}>Yearly Cost: </Text>
            <Text style={styles.balanceAmount}>-${yearlyCost.toFixed(2)}</Text>
          </View>
        </View>
    </View>
  )
}

export default SubscriptionCard;