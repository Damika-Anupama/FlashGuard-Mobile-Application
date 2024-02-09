import React from 'react'
import { ScrollView } from 'react-native'
import Graph from '../components/Graph'
import SubmitFeedback from '../components/SubmitFeedback'

export default function Dashboard() {
  return (
    <ScrollView>
      <Graph />

      <SubmitFeedback />
    </ScrollView>
  )
}
