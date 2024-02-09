import React, { useState, useEffect, useContext } from 'react'
import { View, Dimensions, Text } from 'react-native'
import { Svg, Path, Line } from 'react-native-svg'
import PropTypes from 'prop-types'
import FlashData from './FlashData'
import IncidentsContext from '../contexts/IncidentsContext'

const windowSize = 60
const verticalPadding = 40
const horizontalPadding = 40
const height = 300
const width = Dimensions.get('window').width - 50

const scaleY = (value, h) => h - (value / 10) * h
const scaleX = (value, w) =>
  (value / (windowSize - 2)) * (w - horizontalPadding)

function YAxisLabels() {
  const yAxisHeight = height - verticalPadding
  const numberOfLabels = 11
  const labels = Array.from(
    { length: numberOfLabels },
    (_, i) => ((numberOfLabels - i - 1) / (numberOfLabels - 1)) * 10
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
      {labels.map((label) => (
        <View key={label}>
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
  const { incidents, fetchIncidents } = useContext(IncidentsContext)

  // incidents: [{"ts":1707473738,"luminous_freq":0.0009787055925607178,"red_freq":0}, ...]

  useEffect(() => {
    const interval = setInterval(() => {
      setGraphData(() => {
        const currentTime = Math.floor(Date.now() / 1000)
        const oneMinuteBefore = Math.floor(Date.now() / 1000) - 60 // 1 min ago in Unix timestamp

        // Filter incidents to the last 5 minutes
        const recentIncidents = incidents.filter(
          ({ ts }) => ts >= oneMinuteBefore
        )

        // Create a map of incidents for quick lookup
        const incidentsMap = recentIncidents.reduce((acc, current) => {
          acc[current.ts] = current.luminous_freq
          return acc
        }, {})

        // Generate graph data for the last 60 seconds, filling in zeros where there are no incidents
        const newGraphData = []
        for (let i = 0; i < 60; i += 1) {
          const ts = currentTime - 60 + i
          newGraphData.push(incidentsMap[ts] || 0)
        }

        fetchIncidents()

        return newGraphData
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [incidents])

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
      <FlashData lumFreq={Math.max(...graphData.slice(-4))} />
    </View>
  )
}

GraphPath.propTypes = {
  graphData: PropTypes.arrayOf(PropTypes.number).isRequired,
}

export default RealTimeGraph
