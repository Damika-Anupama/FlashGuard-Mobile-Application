import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import HazardDetectedContext from '../contexts/HazardDetectedContext'

function RealTimeGraph() {
  const windowSize = 30
  const [data, setData] = useState(Array(windowSize).fill(0))
  const { hazardDetected, setHazardDetected } = useContext(
    HazardDetectedContext
  )

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.concat(hazardDetected ? 100 : 0)
        if (newData.length > windowSize) {
          newData.shift()
        }
        return newData
      })
      setHazardDetected(false)
    }, 100)
    return () => clearInterval(interval)
  }, [hazardDetected])

  const yAxisData = [0, 25, 50, 75, 100]

  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <YAxis
          style={{ marginBottom: 10 }}
          data={yAxisData}
          contentInset={{ top: 20, bottom: 10 }}
          svg={{
            fill: 'grey',
            fontSize: 10,
          }}
          formatLabel={(value) => `${value}%`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 10 }}
          data={data}
          curve={shape.curveBasis}
          svg={{ stroke: '#2370FF', strokeWidth: 2 }}
          contentInset={{ top: 20, bottom: 20 }}
          gridMin={100}
        >
          <Grid />
        </LineChart>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
  },
  button: {
    backgroundColor: '#2344FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 4,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default RealTimeGraph
