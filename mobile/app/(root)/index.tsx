import { useUser } from '@clerk/clerk-expo'
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { useTransactions } from '../../hooks/useTransctions'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader'
import { styles } from '@/assets/styles/home.styles'
import { useRouter } from 'expo-router'
import BalanceCard from '@/components/Transactions/BalanceCard'
import TransactionItem from '@/components/Transactions/TransactionItem'
import NoTransactionsFound from '@/components/Transactions/NoTransactionsFound'
import Header from '@/components/Header'

export default function Page() {
  const { user } = useUser();
  const {transactions, summary, loading, loadData, deleteTransaction} = useTransactions(user?.id);
  const router = useRouter();

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = (id: string | number) => {
    Alert.alert('Delete Transaction', 'Are you sure you want to delete this transaction?', [
      {text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteTransaction(id) }
    ])
  }

  if(loading) return <PageLoader/>;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header addType = "transaction"/>

        <BalanceCard summary={summary} />

        <View style={styles.transactionsHeaderContainer}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
        </View>
      </View>

      <FlatList 
        style={styles.transactionsList} 
        contentContainerStyle={styles.transactionsListContent} 
        data={transactions} 
        renderItem={({item}) => (<TransactionItem item={item} onDelete={handleDelete}/>)}
        ListEmptyComponent={<NoTransactionsFound/>}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadData} colors={['#4a90e2']}/>}
      />
    </View>
  )
}