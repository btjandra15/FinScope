import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from '@/assets/styles/home.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';
import { formatDate } from '@/lib/utils';

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

interface SubscriptionItemProps {
    item: {
        id: string | number;
        category: keyof typeof CATEGORY_ICONS | string;
        service_name: string;
        amount: number | string;
        renewal_date: string | Date;
    };
    onDelete: (id: string | number) => void;
}

const SubscriptionItem: React.FC<SubscriptionItemProps> = ({item, onDelete}) => {
    const iconName = (CATEGORY_ICONS[item.category as keyof typeof CATEGORY_ICONS] as keyof typeof CATEGORY_ICONS | 'pricetag-outline');
    const renewalDate = new Date(item.renewal_date);

    const formattedDate = renewalDate.toLocaleDateString('en-US', {
        month: 'short', 
        day: 'numeric'
    });

    return (
        <View style={styles.transactionCard} key={item.id}>
            <TouchableOpacity style={styles.transactionContent}>
                <View style={styles.categoryIconContainer}>
                    <Ionicons name={iconName} size={22} color={COLORS.expense}/>
                </View>

                <View style={styles.transactionLeft}>
                    <Text style={styles.transactionTitle}>{item.service_name}</Text>
                    <Text style={styles.transactionCategory}>{item.category}</Text>
                </View>

                <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, {color: COLORS.expense}]}>
                        -${Math.abs(parseFloat(String(item.amount)))}
                    </Text>

                    <Text style={styles.transactionDate}>Due {formattedDate}</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.id)}>
                <Ionicons name='trash-outline' size={20} color={COLORS.expense}/>
            </TouchableOpacity>
        </View>
    )
}

export default SubscriptionItem;