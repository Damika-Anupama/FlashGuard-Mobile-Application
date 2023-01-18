import React from 'react'
import { Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'

const getFormattedDate = () => {
  // Function to return date as Sunday, 1st January
  const date = new Date()
  return format(date, 'EEEE, do MMMM')
}

export default function Home() {
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
          <Text className="mb-3 text-xl font-bold">Device Status</Text>
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
