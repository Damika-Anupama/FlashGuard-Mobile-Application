import React, { useEffect, useState } from 'react'
import { Card } from 'react-native-paper'
import { VictoryAxis, VictoryChart, VictoryLine } from 'victory-native'

export default function Graph() {
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
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Title title="Hazard Level" />
      <Card.Content>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickValues={[1, 2, 3, 4, 5, 6]}
            tickFormat={(x) => `${x} s`}
          />
          <VictoryAxis dependentAxis />
          <VictoryLine data={data} x="time" y="flashingPixels" />
        </VictoryChart>
      </Card.Content>
    </Card>
  )
}
