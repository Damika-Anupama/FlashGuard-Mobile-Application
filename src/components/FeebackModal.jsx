import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TimePickerModal } from 'react-native-paper-dates'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  Divider,
  Portal,
  RadioButton,
  SegmentedButtons,
} from 'react-native-paper'

const getCurrentTime = () => {
  // Function to get current time in {hours, minutes} format
  const date = new Date()
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  }
}

const formatTime = ({ hours, minutes }) => {
  // Format {hours, minutes} format to system time format AM/PM
  const ampm = hours >= 12 ? 'PM' : 'AM'
  return `${hours % 12 || 12}:${minutes} ${ampm}`
}

export default function FeebackModal({ visible, setVisible }) {
  const hideModal = () => setVisible(false)
  const [severity, setSeverity] = useState(1)
  const [errorType, setErrorType] = React.useState(1)
  const [startTime, setStartTime] = useState(null)
  const [endTime, setEndTime] = useState(null)
  const [timePickerVisible, setTimePickerVisible] = useState(false)

  // Set current time as start/end time

  useEffect(() => {
    setStartTime(getCurrentTime())
    setEndTime(getCurrentTime())
  }, [])

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={false}
        onDismiss={hideModal}
        className="bg-white "
      >
        <Dialog.Title>
          <Text className="mb-3">Feedback</Text>
        </Dialog.Title>

        <Dialog.Content>
          {/* Feedback Type */}
          <View>
            <Text className="my-2 font-bold">
              Choose what kind of error the device made
            </Text>
            <RadioButton.Group
              onValueChange={(value) => {
                setErrorType(value)
              }}
              value={errorType}
            >
              <View className="flex flex-row items-center ">
                <RadioButton value={1} />
                <Text>The glasses darkened unexpectedly</Text>
              </View>
              <View className="flex flex-row items-center ">
                <RadioButton value={2} />
                <Text>The glasses didn&apos;t darken</Text>
              </View>
            </RadioButton.Group>
          </View>
          <Divider className="my-3" />

          {/* Estimated Time */}
          <View>
            <Text className="mb-2 font-bold">
              Select an estimated interval of time when the error occurred
            </Text>
            <View className="flex space-y-3">
              {/* Start Time */}
              <View className="flex flex-row items-center justify-between">
                <Text>Start Time: </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTimePickerVisible(true)
                  }}
                  className="flex flex-row items-center justify-between px-4 py-2 bg-gray-200 rounded-md"
                >
                  <Text>{startTime ? formatTime(startTime) : null}</Text>
                </TouchableOpacity>
              </View>
              {/* End Time */}
              <View className="flex flex-row items-center justify-between">
                <Text>End Time: </Text>
                <TouchableOpacity
                  onPress={() => {
                    setTimePickerVisible(true)
                  }}
                  className="flex flex-row items-center justify-between px-4 py-2 bg-gray-200 rounded-md"
                >
                  <Text>{endTime ? formatTime(endTime) : null}</Text>
                </TouchableOpacity>
              </View>
              {/* Time Picker */}
              <TimePickerModal
                visible={timePickerVisible}
                onDismiss={() => setTimePickerVisible(false)}
                onConfirm={(time) => {
                  setStartTime(time)
                  setTimePickerVisible(false)
                }}
              />
            </View>
          </View>
          <Divider className="my-3" />

          {/* Select Severity */}
          <View>
            <Text className="mb-3 font-bold">
              What was the impact of this mistake
            </Text>
            <SegmentedButtons
              value={severity}
              onValueChange={setSeverity}
              density="small"
              buttons={[
                { label: 'Low', value: 1 },
                { label: 'Medium', value: 2 },
                { label: 'High', value: 3 },
              ]}
            />
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <View className="flex flex-row justify-end space-x-3">
            <Button mode="outlined" onPress={hideModal}>
              Cancel
            </Button>
            <Button mode="contained" onPress={hideModal}>
              Submit
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

// Props validation
FeebackModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
}
