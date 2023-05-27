import { Text, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Card } from 'react-native-paper'
import Slider from '@react-native-community/slider'

export default function Settings() {
  const [tint, setTint] = useState(80)
  const [frequency, setFrequency] = useState(3)
  return (
    <ScrollView>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-lg font-bold">
            Hazard Protection Pefrences
          </Text>
          <Text className="mb-3 text-sm text-gray-600">
            Adjust the values below to change the behavior of the glasses
          </Text>

          <View className="flex flex-row justify-between mt-2">
            <Text className="text-base text-gray-700">Tint Level</Text>
            <Text className="text-base text-gray-700">{tint}%</Text>
          </View>
          <View className="w-full mt-2">
            <Slider
              maximumValue={100}
              minimumTrackTintColor="#005EFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#005EFF"
              value={tint}
              step={1}
              onValueChange={(value) => setTint(value)}
            />
          </View>
          <View className="flex flex-row justify-between mt-4">
            <Text className="text-base text-gray-700">Trigger Frequency</Text>
            <Text className="text-base text-gray-700">{frequency}</Text>
          </View>
          <View className="w-full mt-2">
            <Slider
              maximumValue={30}
              minimumTrackTintColor="#005EFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#005EFF"
              value={frequency}
              step={1}
              onValueChange={(value) => setFrequency(value)}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
