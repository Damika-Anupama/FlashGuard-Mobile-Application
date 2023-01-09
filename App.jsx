import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider as PaperProvider } from 'react-native-paper'
import Welcome from './src/screens/Welcome'
import SignUp from './src/screens/SignUp'
import SignIn from './src/screens/SignIn'
import Dashboard from './src/screens/Dashboard'

const Stack = createStackNavigator()

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  )
}

export default App
