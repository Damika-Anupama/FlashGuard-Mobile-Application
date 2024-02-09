import React, { useEffect, useMemo, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import { StatusBar } from 'expo-status-bar'
import { CosmosClient } from '@azure/cosmos'
import HomeStack from './src/screens/HomeStack'
import Dashboard from './src/screens/Dashboard'
import Device from './src/screens/Device'
import ProfileStack from './src/screens/ProfileStack'
import IncidentsContext from './src/contexts/IncidentsContext'

const cosmosDbEndpoint = process.env.EXPO_PUBLIC_AZURE_COSMOS_URL
const masterKey = process.env.EXPO_PUBLIC_AZURE_COSMOS_MASTER_KEY
const databaseId = process.env.EXPO_PUBLIC_AZURE_COSMOS_DBNAME
const containerId = 'deviceContainer'

const client = new CosmosClient({ endpoint: cosmosDbEndpoint, key: masterKey })

function App() {
  const [incidents, setIncidents] = useState([])

  const incidentsValue = useMemo(
    () => ({ incidents, setIncidents }),
    [incidents, setIncidents]
  )

  useEffect(() => {
    // Load incidents from Azure Cosmos DB
    let load = true

    const fetchIncidents = async () => {
      if (load) {
        const container = client.database(databaseId).container(containerId)
        const querySpec = {
          query: 'SELECT * from c OFFSET 0 LIMIT 10',
        }
        const { resources: items } = await container.items
          .query(querySpec)
          .fetchAll()
        console.log('items', items)
        // setIncidents(items)
      }
    }

    fetchIncidents()

    return () => {
      // Cleanup
      load = false
    }
  }, [])

  return (
    <PaperProvider theme={theme}>
      <IncidentsContext.Provider value={incidentsValue}>
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
      </IncidentsContext.Provider>
      <StatusBar style="dark" />
    </PaperProvider>
  )
}

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

export default App
