import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button } from 'react-native-paper'

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native'

export default function Dashboard() {
  const [data, setData] = useState([
    { time: 1, flashingPixels: 13000 },
    { time: 2, flashingPixels: 16500 },
    { time: 3, flashingPixels: 14250 },
    { time: 4, flashingPixels: 13132 },
    { time: 5, flashingPixels: 15000 },
    { time: 6, flashingPixels: 10000 },
  ])

  const handleUpdateData = () => {
    // Add random data for now
    setData((prevData) => [
      ...prevData
        .map(({ time, flashingPixels }) => ({
          time: time - 1,
          flashingPixels,
        }))
        .slice(-prevData.length + 1),
      { time: prevData.length, flashingPixels: (Math.random() + 1) * 10000 },
    ])
  }

  useEffect(() => {
    const id = setInterval(handleUpdateData, 1000)
    return () => {
      clearInterval(id)
    }
  }, [])

  return (
    <ScrollView className="bg-white">
      {/* Graph */}
      <View className="p-4 m-4 bg-white rounded-md shadow shadow-black">
        <Text className="text-lg font">Hazard Level</Text>
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickFormat={(x) => `${x} s`}
          />
          <VictoryAxis dependentAxis />
          <VictoryLine data={data} x="time" y="flashingPixels" />
        </VictoryChart>
      </View>
      {/* Information */}
      <View className="p-4 m-4 bg-white rounded-md shadow shadow-black">
        <Text className="mb-4 text-lg text-gray-600">Statistics for Today</Text>
        <View className="flex flex-row justify-between ">
          <Text className="text-lg">False Positives: </Text>
          <Text className="text-lg">4</Text>
        </View>
        <View className="flex flex-row justify-between text-lg">
          <Text className="text-lg">False Negatives: </Text>
          <Text className="text-lg">1</Text>
        </View>
      </View>
      {/* Incidents */}
      <View className="p-4 m-4 bg-white rounded-md shadow shadow-black">
        <Text className="mb-4 text-lg text-gray-600">Feedback</Text>
        <View className="flex space-y-4">
          <Button mode="contained" onPress={() => console.log('pressed')}>
            Tag False Positive
          </Button>
          <Button mode="contained" onPress={() => console.log('pressed')}>
            Tag False Negative
          </Button>
        </View>
      </View>
    </ScrollView>
  )
}
