import React from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'

function FlashData({ lumFreq }) {
  return (
    <View className="flex flex-col space-y-2">
      <View className="flex flex-row justify-between">
        <Text className="text-gray-700">Luminance frequency:</Text>
        <Text className="font-bold text-gray-700"> {lumFreq}</Text>
      </View>
      {/* <View className="flex flex-row justify-between">
        <Text className="text-gray-700">Red frequency:</Text>
        <Text className="font-bold text-gray-700"> {redFreq}</Text>
      </View> */}
    </View>
  )
}

FlashData.propTypes = {
  lumFreq: PropTypes.number.isRequired,
}

export default FlashData
