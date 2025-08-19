import { useUser } from '@clerk/clerk-expo'
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
import { useTransactions } from '../../hooks/useTransctions'
import { useEffect } from 'react'
import PageLoader from '@/components/PageLoader'
import { styles } from '@/assets/styles/home.styles'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import { SignOutButton } from '@/components/SignOutButton'
import BalanceCard from '@/components/BalanceCard'
import TransactionItem from '@/components/TransactionItem'
import NoTransactionsFound from '@/components/NoTransactionsFound'

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
        <View style={styles.header}>
          {/* Left Header */}
          <View style={styles.headerLeft}>
            <Image source={require('@/assets/images/logo.png')} style={styles.headerLogo} resizeMode='contain'/>

            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>Weclome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split('@')[0] || 'User'}
              </Text>
            </View>
          </View>

          {/* Right Header */}
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.addButton} onPress={() => router.push('/create')}>
              <Ionicons name='add' size={20} color={'#fff'} />
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>

            <SignOutButton/>
          </View>
        </View>

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