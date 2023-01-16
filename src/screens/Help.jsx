import { Text, ScrollView } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper'

export default function Help() {
  return (
    <ScrollView>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-2xl font-bold">FlashGuard</Text>
          <Text>
            Welcome to the FlashGuard Help Page! FlashGuard is a medical device
            mobile app that aims to provide real-time protection from
            photosensitive epileptic seizures. Our device uses a pair of glasses
            that detect visual stimuli that can trigger a seizure and darken the
            lenses to protect the user from hazardous exposure.
          </Text>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-3 text-xl font-bold">How It Works</Text>
          <Text>
            The core functionality of FlashGuard is to detect possible seizure
            triggers in real-time and darken the glass lens in response. A
            camera fixed to the glasses captures the input and sends it to the
            microprocessor embedded in the frame. The microprocessor then
            processes the input data using an algorithm to measure the frequency
            of changes in color and brightness. If the computed frequencies are
            within the range of frequencies that trigger seizures, the
            electro-chromic glass lens will be darkened until the trigger has
            subsided.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
