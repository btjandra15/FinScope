import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native'
import React, { useState } from 'react'
import { styles } from '@/assets/styles/create.styles';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { COLORS } from '@/constants/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const CATEGORIES = [
  { id: "entertainment", name: "Entertainment", icon: "film" },
  { id: "health", name: "Health", icon: "medkit" },
];

const CreateSubscriptions = () => {
  const [serviceName, setServiceName] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[0].id);
  const [billingCycle, setBillingCycle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [renewalDate, setRenewalDate] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {user} = useUser();

  const handleCreate = async() => {
    if(!serviceName) return Alert.alert("Please enter a Service Name");

    const parsedAmount = parseFloat(amount);

    if (!amount || isNaN(parsedAmount) || parsedAmount <= 0) {
          return Alert.alert('Please enter a valid amount');
    }

    if(!selectedCategory) return Alert.alert("Please select a category");

    if (!billingCycle || (billingCycle !== 'Monthly' && billingCycle !== 'Yearly')) 
      return Alert.alert("Please enter a valid billing cycle (Monthly or Yearly)");

    if(!startDate) return Alert.alert("Please enter a start date");
    if(!renewalDate) return Alert.alert("Please enter a renewal date");

    if(!status || (status !== "Active" && status !== "Paused" && status !== "Canceled")) 
      return Alert.alert("Please enter a valid status (Active, Paused, Canceled)");

    setIsLoading(true);

    try {
      console.log(user?.id)

      const res = await fetch("https://finscope-km3n.onrender.com/api/subscriptions", {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user?.id,
          service_name: serviceName, 
          amount: parsedAmount,
          category: selectedCategory,
          billing_cycle: billingCycle,
          start_date: startDate,
          renewal_date: renewalDate,
          status: status
        })
      })

      if(!res.ok) {
        const errorData = await res.json();
        console.log('Error creating subscription:', errorData);
        return Alert.alert('Error creating subscription', errorData.message || 'Something went wrong');
      }
      
      Alert.alert('Subscription created successfully');
      router.back();
    } catch (error) {
      console.error("Error creating subscription: ", error)
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView       
      style={styles.container} 
      contentContainerStyle={{ justifyContent: 'center'}} 
      enableOnAndroid={true}
      enableAutomaticScroll={true}
      extraHeight={200}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name='arrow-back' size={24} color={COLORS.text}/>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>New Subscription</Text>

        <TouchableOpacity
          style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
          onPress={handleCreate}
          disabled={isLoading}
        >
          <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
        </TouchableOpacity>
      </View>

      {/* SUBSCRIPTION CARD */}
      <View style={styles.card}>
        {/* SERVICE NAME INPUT */}
        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Service Name' 
            placeholderTextColor={COLORS.textLight} 
            value={serviceName} 
            onChangeText={setServiceName}
          />
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
        
        {/* BILLING CYCLE INPUT */}
        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Billing Cycle' 
            placeholderTextColor={COLORS.textLight} 
            value={billingCycle} 
            onChangeText={setBillingCycle}
          />
        </View>

        {/* START DATE INPUT */}
        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Start Date' 
            placeholderTextColor={COLORS.textLight} 
            value={startDate} 
            onChangeText={setStartDate}
          />
        </View>

        {/* RENEWAL DATE INPUT */}
        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Renewal Date' 
            placeholderTextColor={COLORS.textLight} 
            value={renewalDate} 
            onChangeText={setRenewalDate}
          />
        </View>

        {/*STATUS INPUT */}
        <View style={styles.inputContainer}> 
          <Ionicons name="create-outline" size={20} color={COLORS.textLight} style={styles.inputIcon}/>

          <TextInput 
            style={styles.input} 
            placeholder='Status' 
            placeholderTextColor={COLORS.textLight} 
            value={status} 
            onChangeText={setStatus}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default CreateSubscriptions;