import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LineChart, Grid, YAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'

function RealTimeGraph() {
  const windowSize = 30
  const [data, setData] = useState(Array(windowSize).fill(0))
  const [time, setTime] = useState(0)
  const [spike, setSpike] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.concat(spike ? 100 : 0)
        if (newData.length > windowSize) {
          newData.shift()
        }
        return newData
      })
      setTime((prevTime) => prevTime + 1)
      setSpike(false)
    }, 100)
    return () => clearInterval(interval)
  }, [spike])

  const fireEventHandler = () => {
    setSpike(true)
  }

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
        >
          <Grid />
        </LineChart>
      </View>
      <TouchableOpacity style={styles.button} onPress={fireEventHandler}>
        <Text style={styles.buttonText}>Fire event</Text>
      </TouchableOpacity>
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
