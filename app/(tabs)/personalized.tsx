import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../src/components/CustomHeader'

const PersonalizedScreen = () => {
  return (
    <View>
      <CustomHeader title='Personalized' logo={true}/>
      <Text>PersonalizedScreen</Text>
    </View>
  )
}

export default PersonalizedScreen;