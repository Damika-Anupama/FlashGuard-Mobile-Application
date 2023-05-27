import React, { useState, useEffect } from 'react'
import { View, Dimensions } from 'react-native'
import { Svg, Path } from 'react-native-svg'
import PropTypes from 'prop-types'
import useHazardData from '../hooks/hazardData'

const windowSize = 30
const verticalPadding = 40
const horizontalPadding = 40
const height = 200
const { width } = Dimensions.get('window')

const scaleY = (value, h) => h - (value / 100) * h
const scaleX = (value, w) => (value / windowSize) * (w - horizontalPadding)

function GraphPath({ graphData }) {
  const pathData = graphData
    .map(
      (point, index) =>
        `${index === 0 ? 'M' : 'L'} ${scaleX(
          index,
          width - horizontalPadding
        )} ${scaleY(point, height - verticalPadding)}`
    )
    .join(' ')

  return <Path d={pathData} fill="none" stroke="#2370FF" strokeWidth="2" />
}

function RealTimeGraph() {
  const [graphData, setGraphData] = useState(Array(windowSize).fill(0))
  const [flashData] = useHazardData()

  // Add new data point every 100ms
  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData((prevData) => {
        const newData = [...prevData, 0]
        if (newData.length > windowSize) {
          newData.shift()
        }
        return newData
      })
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Add flash data to the graph when it's available
  useEffect(() => {
    if (flashData) {
      setGraphData((prevData) => {
        const newData = [...prevData]
        newData[newData.length - 1] = 100
        return newData
      })
    }
  }, [flashData])

  return (
    <View>
      <Svg height={height} width={width - horizontalPadding}>
        <GraphPath graphData={graphData} />
      </Svg>
    </View>
  )
}

GraphPath.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default RealTimeGraph
