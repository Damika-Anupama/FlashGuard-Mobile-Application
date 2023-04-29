import React from 'react'
import { ScrollView } from 'react-native'
import Incidents from '../components/Incidents'
import Graph from '../components/Graph'
import RealTimeGraph from '../components/RealTimeGraph'
import SubmitFeedback from '../components/SubmitFeedback'

export default function Dashboard() {
  return (
    <ScrollView>
      <RealTimeGraph />

      <SubmitFeedback />
      <Incidents />
    </ScrollView>
  )
}
