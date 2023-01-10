import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

export default function Device() {
  const handleConnectDevice = () => {
    console.log('Connecting Device...')
  }

  return (
    <ScrollView className="bg-white">
      <View className="flex items-center justify-center p-4 m-4 space-y-3 bg-white rounded-md shadow shadow-black">
        <Text className="text-lg text-gray-600">Device not connected</Text>
        <Button mode="outlined" onPress={() => handleConnectDevice}>
          Connect Device
        </Button>
      </View>
    </ScrollView>
  )
}
