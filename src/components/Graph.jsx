import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-paper'
import RealTimeGraph from './RealTimeGraph'

export default function Graph() {
  return (
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Content>
        <Text className="mb-2 text-xl font-bold">Hazard Level</Text>
        <Text className="text-gray-700">
          The graph below displays the hazard level in real-time. When the
          hazard level reaches the danger threshold, the glasses will darken
          immediately.
        </Text>
        <RealTimeGraph />
      </Card.Content>
    </Card>
  )
}
