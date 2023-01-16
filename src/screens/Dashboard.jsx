import React, { useEffect, useMemo, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ScrollView } from 'react-native'

import Incidents from '../components/Incidents'
import Graph from '../components/Graph'
import SubmitFeedback from '../components/SubmitFeedback'
import IncidentsContext from '../contexts/IncidentsContext'

export default function Dashboard() {
  const [incidents, setIncidents] = useState([])

  // Save incidents to storage
  const saveIncidents = async (incident) => {
    try {
      await AsyncStorage.setItem('incidents', JSON.stringify(incident))
    } catch (e) {
      console.log(e)
    }
  }

  // Load incidents from storage
  const loadIncidents = async () => {
    try {
      const incidentsString = await AsyncStorage.getItem('incidents')

      if (incidentsString !== null) {
        setIncidents(JSON.parse(incidentsString))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    // Load incidents on mount
    loadIncidents()
  }, [])

  // Use memo
  const value = useMemo(
    () => ({ incidents, setIncidents, saveIncidents }),
    [incidents, setIncidents, saveIncidents]
  )

  return (
    <ScrollView className="bg-white">
      <Graph />
      <IncidentsContext.Provider value={value}>
        <SubmitFeedback />
        <Incidents />
      </IncidentsContext.Provider>
    </ScrollView>
  )
}
