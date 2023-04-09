import { Image, Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import React from 'react'

export default function Welcome({ navigation }) {
  navigation.setOptions({
    headerShown: false,
  })
  return (
    <View>
      <View className="flex flex-col items-center justify-center mt-20">
        <Image
          className="w-40 h-40 "
          source={require('../../assets/flashguard.jpg')}
        />
      </View>

      <View className="flex flex-col items-center justify-center ">
        <Text className="text-3xl font-bold">FlashGuard</Text>
      </View>

      <View className="px-8 space-y-5 mt-40">
        <Button mode="contained" onPress={() => navigation.navigate('Sign Up')}>
          Sign Up
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Dashboard')}
          icon="microsoft"
        >
          Sign Up with Microsoft
        </Button>
      </View>
    </View>
  )
}
