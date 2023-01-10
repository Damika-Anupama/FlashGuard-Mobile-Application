import React from 'react'
import { Text, View } from 'react-native'

import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native'

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
]

export default function Dashboard() {
  return (
    <View className="flex items-center justify-center bg-white">
      <Text>Dashboard</Text>
      <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4]}
          tickFormat={['Q1', 'Q2', 'Q3', 'Q4']}
        />
        <VictoryAxis dependentAxis tickFormat={(x) => `$${x / 1000}k`} />
        <VictoryLine data={data} x="quarter" y="earnings" />
      </VictoryChart>
    </View>
  )
}
