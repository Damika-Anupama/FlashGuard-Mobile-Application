import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Provider as PaperProvider } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import Home from './src/screens/Home'
import Dashboard from './src/screens/Dashboard'
import Device from './src/screens/Device'
import Profile from './src/screens/Profile'

const Tab = createBottomTabNavigator()

function App() {
  const tabBarIcon = ({ focused, color, size }, route) => {
    let iconName

    if (route.name === 'Home') {
      iconName = focused ? 'home' : 'home-outline'
    } else if (route.name === 'Dashboard') {
      iconName = focused ? 'bar-chart' : 'bar-chart-outline'
    } else if (route.name === 'Device') {
      iconName = focused ? 'glasses' : 'glasses-outline'
    } else if (route.name === 'Profile') {
      iconName = focused ? 'person' : 'person-outline'
    }

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />
  }
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: (props) => tabBarIcon(props, route),
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Dashboard" component={Dashboard} />
          <Tab.Screen name="Device" component={Device} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
