import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'

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
    <View className="flex items-center justify-center bg-white">
      <Text>Dashboard</Text>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5, 6]}
          tickFormat={(x) => `${x} s`}
        />
        <VictoryAxis dependentAxis />
        <VictoryLine data={data} x="time" y="flashingPixels" />
      </VictoryChart>
    </View>
  )
}
