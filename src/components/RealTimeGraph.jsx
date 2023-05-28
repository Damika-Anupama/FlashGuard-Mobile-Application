import React, { useState, useEffect } from 'react'
import { View, Dimensions, Text } from 'react-native'
import { Svg, Path, Line } from 'react-native-svg'
import PropTypes from 'prop-types'
import useHazardData from '../hooks/hazardData'
import FlashData from './FlashData'
import { debounce } from 'lodash'

const windowSize = 30
const verticalPadding = 40
const horizontalPadding = 40
const height = 200
const width = Dimensions.get('window').width - 50

const scaleY = (value, h) => h - (value / 5) * h
const scaleX = (value, w) =>
  (value / (windowSize - 2)) * (w - horizontalPadding)

function YAxisLabels() {
  const yAxisHeight = height - verticalPadding
  const numberOfLabels = 6
  const labels = Array.from(
    { length: numberOfLabels },
    (_, i) => ((numberOfLabels - i - 1) / (numberOfLabels - 1)) * 5
  )

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        height: yAxisHeight,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      {labels.map((label, i) => (
        <View key={i}>
          <Text className="text-xs text-gray-500">{label}</Text>
        </View>
      ))}
    </View>
  )
}

function YAxis() {
  return (
    <Line
      x1="0"
      y1="0"
      x2="0"
      y2={height - verticalPadding}
      stroke="#5482D6"
      strokeWidth="4"
    />
  )
}

function GraphPath({ graphData }) {
  const [pathData, setPathData] = useState('')

  useEffect(() => {
    const newPathData = graphData
      .map(
        (point, index) =>
          `${index === 0 ? 'M' : 'L'} ${scaleX(
            index,
            width - horizontalPadding
          )} ${scaleY(point, height - verticalPadding)}`
      )
      .join(' ')

    setPathData(newPathData)
  }, [graphData])

  return <Path d={pathData} fill="none" stroke="#5482D6" strokeWidth="2" />
}

function RealTimeGraph() {
  const [graphData, setGraphData] = useState(Array(windowSize).fill(0))
  const [flashData] = useHazardData()
  const lumFreq = Number(flashData?.split(',')[0]) || 0
  // const redFreq = Number(flashData?.split(',')[1]) || 0

  // Add new data point every 200ms
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prevData) => {
        const newData = [...prevData, 0]
        if (newData.length > windowSize) {
          newData.shift()
        }
        return newData
      })
    }, 200)
    return () => clearInterval(interval)
  }, [])

  // Add flash data to the graph when it's available
  useEffect(() => {
    const debouncedSetGraphData = debounce(() => {
      if (flashData) {
        setGraphData((prevData) => {
          const newData = [...prevData]
          newData[newData.length - 1] = Number(lumFreq) || 0
          return newData
        })
      }
    }, 10)

    debouncedSetGraphData()

    // clean up on component unmount
    return () => {
      debouncedSetGraphData.cancel()
    }
  }, [flashData])

  return (
    <View>
      <View style={{ width, height, marginTop: 20 }}>
        <YAxisLabels />
        <Svg
          height={height}
          width={width - horizontalPadding}
          className="absolute top-0 right-0"
        >
          <YAxis />
          <GraphPath graphData={graphData} />
        </Svg>
      </View>
      <FlashData lumFreq={graphData[graphData.length - 2]} />
    </View>
  )
}

GraphPath.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default RealTimeGraph
