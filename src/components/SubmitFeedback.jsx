import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card } from 'react-native-paper'
import FeebackModal from './FeebackModal'

export default function SubmitFeedback() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Card className="m-4 bg-white">
        <Card.Content>
          <Text className="mb-4 text-xl font-bold">Feedback</Text>
          <Text className="mb-4 text-gray-700">
            Did the glasses darken as expected or not? Please provide us with
            your feedback to improve your device&apos;s detection capabilities.
          </Text>
          <View className="flex space-y-4">
            <Button mode="contained" onPress={() => setVisible(true)}>
              Report Recognition Mistake
            </Button>
          </View>
        </Card.Content>
      </Card>
      {/* Feedback Modal */}
      <FeebackModal visible={visible} setVisible={setVisible} />
    </>
  )
}
