import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Button, Card } from 'react-native-paper'

export default function Device() {
  const handleConnectDevice = () => {
    console.log('Connecting Device...')
  }

  return (
    <ScrollView className="bg-white">
      <Card mode="elevated" className="m-4 bg-white">
        <Card.Content className="items-center justify-center space-y-3">
          <Text className="text-lg text-gray-600">Device not connected</Text>
          <Button mode="outlined" onPress={() => handleConnectDevice}>
            Connect Device
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
