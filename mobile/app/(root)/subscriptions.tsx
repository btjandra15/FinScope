import { View, Text, FlatList, Alert, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/Subscriptions/SubscriptionCard';
import {useSubscriptions} from '../../hooks/useSubscriptions';
import { useUser } from '@clerk/clerk-expo';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';

const Subscriptions = () => {
  const {user} = useUser();
  const { subscriptions, summary, loading, loadData, deleteSubscription } = useSubscriptions(user?.id);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id: string | number) => {
    Alert.alert('Delete Subscription', 'Are you sure you want to delete this subscription?', [
      {text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteSubscription(id) }
    ])
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header addType='subscription'/>
        <SubscriptionCard summary={summary}/>

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Subscriptions</Text>
        </View>
      </View>

      <FlatList
        style={styles.transactionsList}
        contentContainerStyle={styles.transactionsListContent}  
        data={subscriptions}
        renderItem={({item}) => (<SubscriptionItem item={item} onDelete={handleDelete}/>)}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} colors={['#4a90e2']}/>}
      />
    </View>
  )
}

export default Subscriptions;