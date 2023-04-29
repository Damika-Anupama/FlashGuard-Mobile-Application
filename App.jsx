import React, { useEffect, useMemo, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import HomeStack from './src/screens/HomeStack'
import Dashboard from './src/screens/Dashboard'
import Device from './src/screens/Device'
import ProfileStack from './src/screens/ProfileStack'
import ConnectionContext from './src/contexts/ConnectionContext'
import IncidentsContext from './src/contexts/IncidentsContext'
import HazardDetectedContext from './src/contexts/HazardDetectedContext'

const Tab = createBottomTabNavigator()

// Theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1936DA',
  },
}

const tabBarIcon = ({ focused, color, size }, route) => {
  let iconName

  if (route.name === 'HomeStack') {
    iconName = focused ? 'home' : 'home-outline'
  } else if (route.name === 'Dashboard') {
    iconName = focused ? 'bar-chart' : 'bar-chart-outline'
  } else if (route.name === 'Device') {
    iconName = focused ? 'glasses' : 'glasses-outline'
  } else if (route.name === 'ProfileStack') {
    iconName = focused ? 'person' : 'person-outline'
  }

  return <Ionicons name={iconName} size={size} color={color} />
}

function App() {
  const [connected, setConnected] = useState(false)
  const connectedValue = useMemo(
    () => ({
      connected,
      setConnected,
    }),
    [connected]
  )

  const [incidents, setIncidents] = useState([])
  const [hazardDetected, setHazardDetected] = useState(false)

  const hazardDetectedValue = useMemo(
    () => ({
      hazardDetected,
      setHazardDetected,
    }),
    [hazardDetected]
  )

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

  const incidentsValue = useMemo(
    () => ({ incidents, setIncidents, saveIncidents }),
    [incidents, setIncidents, saveIncidents]
  )

  return (
    <PaperProvider theme={theme}>
      <ConnectionContext.Provider value={connectedValue}>
        <IncidentsContext.Provider value={incidentsValue}>
          <HazardDetectedContext.Provider value={hazardDetectedValue}>
            <NavigationContainer>
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: (props) => tabBarIcon(props, route),
                  tabBarActiveTintColor: 'tomato',
                  tabBarInactiveTintColor: 'gray',
                })}
              >
                <Tab.Screen
                  name="HomeStack"
                  component={HomeStack}
                  options={{ title: 'Home', headerShown: false }}
                />
                <Tab.Screen name="Dashboard" component={Dashboard} />
                <Tab.Screen name="Device" component={Device} />
                <Tab.Screen
                  name="ProfileStack"
                  component={ProfileStack}
                  options={{ title: 'Profile', headerShown: false }}
                />
              </Tab.Navigator>
            </NavigationContainer>
          </HazardDetectedContext.Provider>
        </IncidentsContext.Provider>
      </ConnectionContext.Provider>
      <StatusBar style="dark" />
    </PaperProvider>
  )
}

export default App
