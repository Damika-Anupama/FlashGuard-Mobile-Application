import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, PermissionsAndroid } from 'react-native'
import { Button, Card } from 'react-native-paper'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import PropsTypes from 'prop-types'

const useBluetoothDevice = () => {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)

  const requestPermissions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )

      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Permissions not granted')
      }
    } catch (err) {
      console.warn(err)
    }
  }

  const connectToDevice = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices()
      const device = paired[0]
      let connection = await device.isConnected()

      if (!connection) {
        console.log('Connecting')
        connection = await device.connect()
      }

      console.log('Connected')

      device.onDataReceived((event) => {
        console.log(event.data)
      })
    } catch (err) {
      console.warn('Error connecting to device', err)
    }
  }

  const disconnectFromDevice = async () => {
    try {
      const paired = await RNBluetoothClassic.getBondedDevices()
      const device = paired[0]
      const connection = await device.isConnected()

      if (connection) {
        console.log('Disconnecting')
        await device.disconnect()
      }

      console.log('Disconnected')
    } catch (err) {
      console.warn('Error disconnecting from device', err)
    }
  }

  const handleConnectDevice = async () => {
    setLoading(true)
    await requestPermissions()

    if (connected) {
      await disconnectFromDevice()
      setConnected(false)
    } else {
      await connectToDevice()
      setConnected(true)
    }

    setLoading(false)
  }

  // return { connected, count, loading, handleConnectDevice }
  useEffect(() => {
    disconnectFromDevice().then(handleConnectDevice())
  }, [])
}

function DeviceStatusCard({ connected }) {
  return (
    <Card className="m-4 bg-white" mode="elevated">
      <Card.Content>
        <Text className="mb-3 text-xl font-bold">Device Status</Text>
        <Text className="mb-5 text-gray-700">
          Make sure you keep your device connected to your phone at all times.
          If you are not using your device, make sure you disconnect it to
          preserve battery life.
        </Text>

        <View className="flex flex-row justify-between">
          <Text className="text-lg">Battery Level: </Text>
          <Text className="text-lg text-green-700">93%</Text>
        </View>
        <View className="flex flex-row justify-between">
          <Text className="text-lg">Connection Strength</Text>
          <Text className="text-lg text-orange-600">Medium</Text>
        </View>
      </Card.Content>
    </Card>
  )
}

export default function Device() {
  useBluetoothDevice()

  return null
  const { connected, count, loading, handleConnectDevice } =
    useBluetoothDevice()

  let buttonText = 'Connect Device'
  if (loading) {
    buttonText = 'Connecting...'
  } else if (connected) {
    buttonText = 'Disconnect Device'
  }

  return (
    <ScrollView className="bg-white">
      <Card mode="elevated" className="m-4 bg-white">
        <Card.Content className="items-center justify-center space-y-3">
          <Text className="text-lg text-gray-600">{`Device ${
            connected ? '' : 'not'
          } connected`}</Text>
          <Text className="text-lg text-gray-600">{`Count: ${count}`}</Text>

          <Button
            mode="outlined"
            onPress={handleConnectDevice}
            loading={loading}
          >
            {buttonText}
          </Button>
        </Card.Content>
      </Card>

      {connected && <DeviceStatusCard connected={connected} />}
    </ScrollView>
  )
}

DeviceStatusCard.propTypes = {
  connected: PropsTypes.bool.isRequired,
}
