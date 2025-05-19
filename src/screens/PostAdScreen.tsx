import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../components/CustomHeader'

const PostAdScreen = () => {
  return (
    <View>
      <CustomHeader title='Post Ad' logo={true}/>
      <Text>PostAdScreen</Text>
    </View>
  )
}

export default PostAdScreen