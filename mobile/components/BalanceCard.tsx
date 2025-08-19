import { View, Text } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/colors';

interface BalanceSummary {
  totalBalance: number | string;
  totalIncome: number | string;
  expenses: number | string;
}

interface BalanceCardProps {
  summary: BalanceSummary;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ summary }) => {
  return (
    <View style={styles.balanceCard}>
        <Text style={styles.balanceTitle}>Total Balance: </Text>
        <Text style={styles.balanceAmount}>${parseFloat(summary.totalBalance as string).toFixed(2)}</Text>

        <View style={styles.balanceStats}>
            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Income</Text>

                <Text style={[styles.balanceStatAmount, {color: COLORS.income}]}>
                    +${parseFloat(summary.totalIncome as string).toFixed(2)}
                </Text>
            </View>

            <View style={[styles.balanceStatItem, styles.statDivider]}/>

            <View style={styles.balanceStatItem}>
                <Text style={styles.balanceStatLabel}>Expenses</Text>

                <Text style={[styles.balanceStatAmount, {color: COLORS.expense}]}>
                    -${parseFloat(summary.expenses as string).toFixed(2)}
                </Text>
            </View>
        </View>
    </View>
  )
}

export default BalanceCard;