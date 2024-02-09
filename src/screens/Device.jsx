import React from 'react'
import { ScrollView, Text } from 'react-native'
import { Card } from 'react-native-paper'
// import useHazardData from '../hooks/hazardData'

export default function Device() {
  // const [data, setData] = useHazardData()

  return (
    <ScrollView className="bg-white">
      <Card mode="elevated" className="m-4 bg-white">
        <Card.Content className="items-center justify-center space-y-3">
          <Text className="text-lg text-gray-600">
            Bluetooth not available for this Demo
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
