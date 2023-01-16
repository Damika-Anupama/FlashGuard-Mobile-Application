import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MD3LightTheme, Provider as PaperProvider } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons'
import HomeStack from './src/screens/HomeStack'
import Dashboard from './src/screens/Dashboard'
import Device from './src/screens/Device'
import ProfileStack from './src/screens/ProfileStack'

const Tab = createBottomTabNavigator()

// Theme
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#1936DA',
  },
}

function App() {
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

    // You can return any component that you like here!
    return <Ionicons name={iconName} size={size} color={color} />
  }
  return (
    <PaperProvider theme={theme}>
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
    </PaperProvider>
  )
}

export default App
