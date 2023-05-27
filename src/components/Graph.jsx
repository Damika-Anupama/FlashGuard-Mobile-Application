import React from 'react'
import { Text, View } from 'react-native'
import { Card } from 'react-native-paper'
import RealTimeGraph from './RealTimeGraph'

export default function Graph() {
  return (
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Content>
        <Text className="mb-2 text-xl font-bold">Hazard Information</Text>
        <Text className="text-gray-700">
          The graph below displays the detected flashes in real-time
        </Text>
        <RealTimeGraph />
        <View className="flex flex-col mt-4 space-y-2">
          <Text className="text-gray-700">Luminance frequency:</Text>
          <Text className="text-gray-700">Red frequency:</Text>
        </View>
      </Card.Content>
    </Card>
  )
}
