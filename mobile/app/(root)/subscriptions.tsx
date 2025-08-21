import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/Subscriptions/SubscriptionCard';
import {useSubscriptions} from '../../hooks/useSubscriptions';
import { useUser } from '@clerk/clerk-expo';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';
import NoSubscriptionsFound from '@/components/Subscriptions/NoSubscriptionsFound';

const Subscriptions = () => {
  const {user} = useUser();
  const futureMonths = 5;

  type Subscription = {
    id: string | number;
    renewal_date: string | Date;
    // add other properties as needed
    [key: string]: any;
  };

  const { subscriptions, summary, loading, loadData, deleteSubscription } = useSubscriptions(user?.id) as unknown as {
    subscriptions: Subscription[];
    summary: any;
    loading: boolean;
    loadData: () => void;
    deleteSubscription: (id: string | number) => void;
  };

  const handleDelete = (id: string | number) => {
    Alert.alert('Delete Subscription', 'Are you sure you want to delete this subscription?', [
      {text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSubscription(id) }
    ])
  }
  
  const upcomingCharges = subscriptions.flatMap((sub, subIndex) => {
    const renewalDate = new Date(sub.renewal_date);

    return Array.from({ length: futureMonths }, (_, i) => {
      const nextDate = new Date(renewalDate);

      nextDate.setMonth(renewalDate.getMonth() + i);

      return {
        ...sub,
        renewal_date: nextDate,
        uniqueId: `${sub.id}-${nextDate.getTime()}-${Math.random()}`, // unique key for FlatList
      };
    });
  }).sort((a, b) => {
      return new Date(a.renewal_date).getTime() - new Date(b.renewal_date).getTime();
  });

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header addType='subscription'/>
        <SubscriptionCard summary={summary}/>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Upcoming Subscriptions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}  
        keyExtractor={(_, index) => `charge-${index}`}
        data={upcomingCharges}
        renderItem={({item}) => (<SubscriptionItem item={item} onDelete={handleDelete}/>)}
        ListEmptyComponent={<NoSubscriptionsFound/>}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} colors={['#4a90e2']}/>}
      />
    </View>
  )
}

export default Subscriptions;