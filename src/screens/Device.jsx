import React, { useContext, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import ConnectionContext from '../contexts/ConnectionContext'

export default function Device() {
  const { connected, setConnected } = useContext(ConnectionContext)
  const [loading, setLoading] = useState(false)

  const handleConnectDevice = () => {
    if (connected) {
      setConnected(false)
      console.log('Device disconnected')
    } else {
      setLoading(true)
      console.log('Connecting device')
      setTimeout(() => {
        setLoading(false)
        setConnected(true)
        console.log('Device connected')
      }, 3000)
    }
  }

  let buttonText = 'Connect Device'
  if (loading) {
    buttonText = 'Connecting...'
  } else if (connected) {
    buttonText = 'Disconnect Device'
  }

  return (
    <ScrollView className="bg-white">
      <Card mode="elevated" className="m-4 bg-white">
        <Card.Content className="items-center justify-center space-y-3">
          <Text className="text-lg text-gray-600">{`Device ${
            connected ? '' : 'not'
          } connected`}</Text>

          <Button
            mode="outlined"
            onPress={handleConnectDevice}
            loading={loading}
          >
            {buttonText}
          </Button>
        </Card.Content>
      </Card>

      {connected ? (
        <Card className="m-4 bg-white " mode="elevated">
          <Card.Content>
            <Text className="mb-3 text-xl font-bold">Device Status</Text>
            <Text className="mb-5 text-gray-700">
              Make sure you keep your device connected to your phone at all
              times. If you are not using your device, make sure you disconnect
              it to preserve battery life.
            </Text>

            <View className="flex flex-row justify-between">
              <Text className="text-lg">Battery Level: </Text>
              <Text className="text-lg text-green-700">93%</Text>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="text-lg">Connection Strength</Text>
              <Text className="text-lg text-orange-600">Medium</Text>
            </View>
          </Card.Content>
        </Card>
      ) : null}
    </ScrollView>
  )
}
