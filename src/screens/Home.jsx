import React, { useContext } from 'react'
import { Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import ConnectionContext from '../contexts/ConnectionContext'

const getFormattedDate = () => {
  // Function to return date as Sunday, 1st January
  const date = new Date()
  return format(date, 'EEEE, do MMMM')
}

export default function Home() {
  const { connected } = useContext(ConnectionContext)
  const navigation = useNavigation()

  return (
    <View>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-4 text-lg font-bold text-blue-900">
            {getFormattedDate()}
          </Text>
          <Text className="mb-2 text-3xl font-bold">FlashGuard</Text>
          <Text className="italic text-gray-700">
            &quot;Preventing seizures, one flash at a time&quot;
          </Text>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-2 text-xl font-bold">Stats for Today</Text>
          <Text className="mb-5 text-gray-700">
            Your daily stats are displayed below. You can view your more details
            on incidents in the Dashboard.
          </Text>
          <View className="flex flex-row justify-between">
            <Text className="text-lg">Hazards blocked </Text>
            <Text className="text-lg">133</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-lg">Incidents </Text>
            <Text className="text-lg">5</Text>
          </View>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <View className="flex flex-row items-center justify-between pr-2 mb-3">
            <Text className="text-xl font-bold">Device Status </Text>
            {connected ? (
              <Ionicons name="checkmark-circle" size={24} color="green" />
            ) : (
              <Ionicons name="close-circle" size={24} color="orange" />
            )}
          </View>
          <Text className="mb-5 text-gray-700">
            {connected
              ? 'Your device is currently connected and ready to use.'
              : 'Your device is currently disconnected. Go to the Device tab to connect your device.'}
          </Text>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate('Help')
            }}
          >
            Learn more about FlashGuard
          </Button>
        </Card.Content>
      </Card>
    </View>
  )
}
