import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-paper'
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native'

export default function Graph() {
  const [data, setData] = useState([
    { time: 1, flashingPixels: 13 },
    { time: 2, flashingPixels: 16 },
    { time: 3, flashingPixels: 14 },
    { time: 4, flashingPixels: 13 },
    { time: 5, flashingPixels: 15 },
    { time: 6, flashingPixels: 10 },
    { time: 7, flashingPixels: 20 },
    { time: 8, flashingPixels: 15 },
    { time: 9, flashingPixels: 10 },
    { time: 10, flashingPixels: 20 },
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
      { time: prevData.length, flashingPixels: (Math.random() + 1) * 20 },
    ])
  }

  useEffect(() => {
    const id = setInterval(handleUpdateData, 200)
    return () => {
      clearInterval(id)
    }
  }, [])
  return (
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Content>
        <Text className="mb-2 text-xl font-bold">Hazard Level</Text>
        <Text className="text-gray-700">
          The graph below displays the hazard level in real-time. When the
          hazard level reaches the danger threshold, the glasses will darken
          immediately.
        </Text>

        <VictoryChart
          className="p-0"
          domainPadding={{ x: 20, y: 20 }}
          domain={{ y: [0, 100] }}
          theme={VictoryTheme.material}
        >
          <VictoryAxis
            dependentAxis
            crossAxis={false}
            label="% of flashing pixels"
            style={{
              axisLabel: { padding: 40 },
            }}
          />
          <VictoryLine
            data={data}
            x="time"
            y="flashingPixels"
            style={{ data: { strokeWidth: 3 } }}
            interpolation="natural"
          />
          {/* Threshold line */}
          <VictoryLine
            data={[
              { x: 10, y: 80 },
              { x: 0, y: 80 },
            ]}
            style={{ data: { stroke: '#F65427' } }}
            standalone={false}
          />
          <VictoryLine
            data={[
              { x: 10, y: 0 },
              { x: 0, y: 0 },
            ]}
            standalone={false}
          />
        </VictoryChart>
      </Card.Content>
    </Card>
  )
}
