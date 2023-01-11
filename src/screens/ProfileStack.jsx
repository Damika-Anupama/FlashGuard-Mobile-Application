import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profile from './Profile'
import Settings from './Settings'

const Stack = createNativeStackNavigator()

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  )
}
