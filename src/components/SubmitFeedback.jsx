import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card } from 'react-native-paper'
import FeebackModal from './FeebackModal'

export default function SubmitFeedback() {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Card className="m-4 bg-white">
        <Card.Title title="Feedback" />
        <Card.Content>
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
