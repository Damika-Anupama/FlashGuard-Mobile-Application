import { Text, ScrollView, View } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'
import Slider from '@react-native-community/slider'

export default function Settings() {
  return (
    <ScrollView>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-lg font-bold">
            Hazard Protection Level
          </Text>

          <Text className="text-gray-600">
            Adjust how much you want to darken the glasses during a detected
            hazard.
          </Text>
          <View className="mt-4">
            <Slider
              style={{ width: '100%', height: 40 }}
              minimumValue={0}
              maximumValue={100}
              minimumTrackTintColor="#005EFF"
              maximumTrackTintColor="#000000"
              thumbTintColor="#005EFF"
              value={80}
            />
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
