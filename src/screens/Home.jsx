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
          <Text className="text-3xl font-bold">Welcome</Text>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-lg font-bold">Stats for Today</Text>
          <View className="flex flex-row justify-between">
            <Text>Hazards blocked </Text>
            <Text>133</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text>Incidents </Text>
            <Text>5</Text>
          </View>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-lg font-bold">Device Status</Text>
          <View className="flex flex-row justify-between">
            <Text>Battery Level: </Text>
            <Text>93%</Text>
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
