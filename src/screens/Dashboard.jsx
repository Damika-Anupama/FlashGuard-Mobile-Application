import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native'
import FeebackModal from '../components/FeebackModal'

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

  // Feedback Modal State
  const [visible, setVisible] = useState(false)

  return (
    <ScrollView className="bg-white">
      {/* Graph */}
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Title title="Hazard Level" />
        <Card.Content>
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis
              tickValues={[1, 2, 3, 4, 5, 6]}
              tickFormat={(x) => `${x} s`}
            />
            <VictoryAxis dependentAxis />
            <VictoryLine data={data} x="time" y="flashingPixels" />
          </VictoryChart>
        </Card.Content>
      </Card>
      {/* Information */}
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Title title="Information" />

        <Card.Content>
          <View className="flex flex-row justify-between ">
            <Text className="text-lg">False Positives: </Text>
            <Text className="text-lg">4</Text>
          </View>
          <View className="flex flex-row justify-between text-lg">
            <Text className="text-lg">False Negatives: </Text>
            <Text className="text-lg">1</Text>
          </View>
        </Card.Content>
      </Card>

      {/* Feedback */}
      <Card className="m-4 bg-white">
        <Card.Title title="Feedback" />
        <Card.Content>
          <View className="flex space-y-4">
            <Button mode="contained" onPress={() => setVisible(true)}>
              Report Recognition Mistake
            </Button>
          </View>
        </Card.Content>
      </Card>
      {/* Feedback Modal */}
      <FeebackModal visible={visible} setVisible={setVisible} />
    </ScrollView>
  )
}
