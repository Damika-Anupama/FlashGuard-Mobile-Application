import React, { useState, useEffect, useRef, useContext } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Svg, Path, Line, G } from 'react-native-svg'
import HazardDetectedContext from '../contexts/HazardDetectedContext'

const windowSize = 30
const verticalPadding = 40
const horizontalPadding = 40
const height = 200
const { width } = Dimensions.get('window')

const scaleY = (value, h) => h - (value / 100) * h
const scaleX = (value, w) => (value / windowSize) * (w - horizontalPadding)

const yValues = [0, 25, 50, 75, 100]

function RealTimeGraph() {
  const [data, setData] = useState(Array(windowSize).fill(0))
  const pathRef = useRef('')
  const { hazardDetected, setHazardDetected } = useContext(
    HazardDetectedContext
  )

  // Call setHazardDetected(true) every random interval between 0 and 2 seconds
  // For testing
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setHazardDetected(true)
  //   }, Math.random() * 500)
  //   return () => clearInterval(interval)
  // }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prevData) => {
        const newData = prevData.concat(0)
        if (newData.length > windowSize) {
          newData.shift()
        }
        return newData
      })
      setHazardDetected(false)
    }, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hazardDetected) {
      setData((prevData) => {
        if (prevData.length <= 1) {
          return prevData
        }
        const newData = [...prevData]
        newData[newData.length - 1] = 100
        return newData
      })
      setHazardDetected(false)
    }
  }, [hazardDetected])

  useEffect(() => {
    const path = data
      .map((point, index) => {
        if (index === 0) {
          return `M ${scaleX(index, width - horizontalPadding)} ${scaleY(
            point,
            height - verticalPadding
          )}`
        }
        return `L ${scaleX(index, width - horizontalPadding)} ${scaleY(
          point,
          height - verticalPadding
        )}`
      })
      .join(' ')

    pathRef.current = path
  }, [data])

  return (
    <View style={styles.chartContainer}>
      <Svg height={height} width={width - horizontalPadding}>
        <G y={height - verticalPadding}>
          {yValues.map((value, index) => (
            <Line
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              x1="0"
              x2={width - horizontalPadding}
              y1={scaleY(value, height - verticalPadding)}
              y2={scaleY(value, height - verticalPadding)}
              stroke="grey"
              strokeWidth="0.5"
            />
          ))}
        </G>
        <Path
          d={pathRef.current}
          fill="none"
          stroke="#2370FF"
          strokeWidth="2"
        />
      </Svg>
    </View>
  )
}

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    height: height - verticalPadding,
    justifyContent: 'center',
  },
})

export default RealTimeGraph
