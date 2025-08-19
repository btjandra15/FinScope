import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { styles } from '@/assets/styles/create.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';

const CATEGORIES = [
  { id: "income", name: "Income", icon: "cash" },
  { id: "bills", name: "Bills", icon: "receipt" },
  { id: "restaurant", name: "Restaurant", icon: "fast-food" },
  { id: "shopping", name: "Shopping", icon: "cart" },
  { id: "transportation", name: "Transportation", icon: "car" },
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "health", name: "Health", icon: "medkit" },
  { id: "technology", name: "Technology", icon: "desktop" },
  { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const Create = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [isExpense, setIsExpense] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {user} = useUser();

  const handleCreate = async() => {
    if(!title.trim()) return Alert.alert('Please enter a title');

    const parsedAmount = parseFloat(amount);
    
    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return Alert.alert('Please enter a valid amount');
    }

    if(!selectedCategory) return Alert.alert('Please select a category');

    setIsLoading(true);

    try {
      const formattedAmount = isExpense ? -Math.abs(parsedAmount) : Math.abs(parsedAmount);

      const res = await fetch("https://finscope-km3n.onrender.com/api/transactions", {
        method: 'POST',
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          title,
          amount: formattedAmount,
          category: selectedCategory,
        }),
      });

      if(!res.ok) {
        const errorData = await res.json();
        console.log('Error creating transaction:', errorData);
        return Alert.alert('Error creating transaction', errorData.message || 'Something went wrong');
      }

      Alert.alert('Transaction created successfully');
      router.back();
    } catch (error) {
      console.error('Error creating transaction:', error);
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={COLORS.text}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Transaction</Text>

        <TouchableOpacity 
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]} 
          onPress={handleCreate} 
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>
            {isLoading ? 'Saving...' : 'Save'}
          </Text>

          {!isLoading && <Ionicons name='checkmark' size={20} color={COLORS.primary} />}
        </TouchableOpacity>
      </View>

      {/* TRANSACTION CARD */}
      <View style={styles.card}>
        {/* TYPE INPUT */}
        <View style={styles.typeSelector}>
          {/* EXPENSE SELECTOR */}
          <TouchableOpacity style={[styles.typeButton, isExpense && styles.typeButtonActive]} onPress={() => setIsExpense(true)}>
            <Ionicons name="arrow-down-circle" size={22} color={isExpense ? COLORS.white : COLORS.expense} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>Expense</Text>
          </TouchableOpacity>

          {/* INCOME SELECTOR */}
          <TouchableOpacity style={[styles.typeButton, !isExpense && styles.typeButtonActive]} onPress={() => setIsExpense(false)}>
            <Ionicons name="arrow-up-circle" size={22} color={!isExpense ? COLORS.white : COLORS.income} style={styles.typeIcon}/>
            <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>Income</Text>
          </TouchableOpacity>
        </View>

        {/* AMOUNT INPUT */}
        <View style={styles.amountContainer}>
          <Text style={styles.currencySymbol}>$</Text>

          <TextInput
            style={styles.amountInput} 
            placeholder="0.00" 
            placeholderTextColor={COLORS.textLight} 
            value={amount} 
            onChangeText={setAmount} 
            keyboardType="numeric" 
          />
        </View>

        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Transaction Title' 
            placeholderTextColor={COLORS.textLight} 
            value={title} 
            onChangeText={setTitle}
          />
        </View>

        {/* CATEGORY SELECTOR */}
        <Text style={styles.sectionTitle}>
          <Ionicons name="pricetag-outline" size={16} color={COLORS.text}/> Category
        </Text>

        <View style={styles.categoryGrid}>
          {CATEGORIES.map((category) => (
            <TouchableOpacity 
              key={category.id}
              style={[styles.categoryButton, selectedCategory === category.name && styles.categoryButtonActive]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Ionicons 
                name={category.icon as any} 
                size={20} 
                color={selectedCategory === category.name ? COLORS.white : COLORS.text} 
                style={styles.categoryIcon}
              />

              <Text style={[styles.categoryButtonText, selectedCategory === category.name && styles.categoryButtonTextActive]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
      )}
    </View>
  )
}

export default Create