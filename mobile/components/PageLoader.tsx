import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '@/constants/colors'
import { styles } from '@/assets/styles/auth.styles'

const PageLoader = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  )
}

export default PageLoader