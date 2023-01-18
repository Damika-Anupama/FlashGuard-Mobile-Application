import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import Settings from './Settings'
import Help from './Help'

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Help" component={Help} />
    </Stack.Navigator>
  )
}
