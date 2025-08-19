import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { styles } from '@/assets/styles/home.styles';
import { COLORS } from '@/constants/colors';
import {formatDate} from '../lib/utils';

const CATEGORY_ICONS = {
  Bills: "receipt",
  Income: "cash",
  Restaurant: "fast-food",
  Shopping: "cart",
  Transportation: "car",
  Entertainment: "film",
  Health: "medkit",
  Technology: "desktop",
  Other: "ellipsis-horizontal",
};

interface TransactionItemProps {
    item: {
        id: string | number;
        title: string;
        category: keyof typeof CATEGORY_ICONS | string;
        amount: string | number;
        created_at: string | Date;
    };
    onDelete: (id: string | number) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({item, onDelete}) => {
    const isIncome = parseFloat(item.amount as string) > 0;
    const iconName = (CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS] as keyof typeof CATEGORY_ICONS | 'pricetag-outline');

    return (
        <View style={styles.transactionCard} key={item.id}>
            <TouchableOpacity style={styles.transactionContent}>
                <View style={styles.categoryIconContainer}>
                    <Ionicons name={iconName as any} size={22} color={isIncome ? COLORS.income : COLORS.expense}/>
                </View>

                <View style={styles.transactionLeft}>
                    <Text style={styles.transactionTitle}>{item.title}</Text>
                    <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>

                <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, {color: isIncome ? COLORS.income : COLORS.expense}]}>
                        {isIncome ? '+' : '-'}${Math.abs(parseFloat(String(item.amount))).toFixed(2)}
                    </Text>

                    <Text style={styles.transactionDate}>
                        {formatDate(item.created_at)}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Ionicons name='trash-outline' size={20} color={COLORS.expense}/>
            </TouchableOpacity>
        </View>
    )
}

export default TransactionItem;