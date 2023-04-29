import React, { useContext, useEffect, useState } from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-paper'
import ConnectionContext from '../contexts/ConnectionContext'

export default function Graph() {
  // const { connected } = useContext(ConnectionContext)

  return (
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Content>
        <Text className="mb-2 text-xl font-bold">Hazard Level</Text>
        <Text className="text-gray-700">
          The graph below displays the hazard level in real-time. When the
          hazard level reaches the danger threshold, the glasses will darken
          immediately.
        </Text>
        {/* <VictoryChart
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
          {connected ? (
            <VictoryLine
              data={data}
              x="time"
              y="flashingPixels"
              style={{ data: { strokeWidth: 3 } }}
              interpolation="natural"
            />
          ) : null}
          {/* Threshold line */}
        {/* <VictoryLine
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
        /> */}
        {/* </VictoryChart> */}
      </Card.Content>
    </Card>
  )
}
