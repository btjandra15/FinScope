import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { styles } from '@/assets/styles/home.styles';
import Header from '@/components/Header';
import SubscriptionCard from '@/components/SubscriptionCard';
import {useSubscriptions} from '../../hooks/useSubscriptions';

const Subscriptions = () => {
  const { subscriptions, summary, loadData, deleteSubscription } = useSubscriptions();

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header/>
        <SubscriptionCard summary={summary}/>
      </View>
    </View>
  )
}

export default Subscriptions;