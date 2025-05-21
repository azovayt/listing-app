import { View, Text } from 'react-native'
import React from 'react'
import CustomHeader from '../../src/components/CustomHeader'

const PostAd = () => {
  return (
    <View>
      <CustomHeader title='Post Ad' logo={true}/>
      <Text>PostAdScreen</Text>
    </View>
  )
}

export default PostAd;