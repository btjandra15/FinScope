import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SignOutButton } from './SignOutButton'
import { styles } from '@/assets/styles/home.styles'
import { useUser } from '@clerk/clerk-expo'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'

type HeaderProps = {
  addType?: "transaction" | "subscription"; // default transaction
};

const Header = ({addType = "transaction"}: HeaderProps) => {
    const router = useRouter();
    const {user} = useUser();

    const handleAdd = () => {
        if(addType === "transaction") router.push('/createTransactions');
        if(addType === "subscription") router.push('/createSubscriptions');
    }

    return (
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
                <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
                    <Ionicons name='add' size={20} color={'#fff'} />
                    <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>

                <SignOutButton/>
            </View>
        </View>
    )
}

export default Header