import React, { useContext, useEffect, useReducer, useState } from 'react'
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
import {
  feedbackReducer,
  ACTIONS,
  initialState,
} from '../reducers/feedbackReducer'
import IncidentsContext from '../contexts/IncidentsContext'

export default function FeebackModal({ visible, setVisible }) {
  const [state, dispatch] = useReducer(feedbackReducer, initialState)
  const { severity, errorType, startTime, endTime } = state
  const [timePickerVisible, setTimePickerVisible] = useState(false)
  const [selectedTimeEndpoint, setSelectedTimeEndpoint] = useState(0)

  const { incidents, setIncidents, saveIncidents } =
    useContext(IncidentsContext)

  const handleSubmit = () => {
    setVisible(false)
    const newIncidents = [
      ...incidents,
      {
        ...state,
        id: incidents.length + 1,
      },
    ]
    setIncidents(newIncidents)
    saveIncidents(newIncidents)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  useEffect(() => {
    // Set current time as start/end time
    dispatch({ type: ACTIONS.SET_START_TIME, payload: new Date() })
    dispatch({ type: ACTIONS.SET_END_TIME, payload: new Date() })
  }, [])

  return (
    <Portal>
      <Dialog
        visible={visible}
        dismissable={false}
        onDismiss={handleCancel}
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
                dispatch({ type: ACTIONS.SET_ERROR_TYPE, payload: value })
              }}
              value={errorType}
            >
              <View className="flex flex-row items-center ">
                <RadioButton value={1} />
                <Text>The glasses darkened unexpectedly (FP)</Text>
              </View>
              <View className="flex flex-row items-center ">
                <RadioButton value={2} />
                <Text>The glasses didn&apos;t darken (FN)</Text>
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
                    setSelectedTimeEndpoint(0)
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
                    setSelectedTimeEndpoint(1)
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
                  dispatch({
                    type:
                      selectedTimeEndpoint === 0
                        ? ACTIONS.SET_START_TIME
                        : ACTIONS.SET_END_TIME,
                    payload: convertTimeToDate(time),
                  })
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
              onValueChange={(value) => {
                dispatch({ type: ACTIONS.SET_SEVERITY, payload: value })
              }}
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
            <Button mode="outlined" onPress={handleCancel}>
              Cancel
            </Button>
            <Button mode="contained" onPress={handleSubmit}>
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

const convertTimeToDate = ({ hours, minutes }) => {
  const date = new Date()
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

const formatTime = (date) => {
  // Format date to 12 hour time

  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hours12 = hours % 12 || 12
  const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes
  return `${hours12}:${minutesFormatted} ${ampm}`
}
