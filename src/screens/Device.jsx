import React, { useState } from 'react'
import { ScrollView, Text, View, PermissionsAndroid } from 'react-native'
import { Button, Card } from 'react-native-paper'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import useHazardData from '../hooks/hazardData'

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

const useBluetoothDevice = (setData) => {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [subscription, setSubscription] = useState(null)

  const connectToDevice = async () => {
    try {
      if (subscription) {
        subscription.remove()
      }
      const paired = await RNBluetoothClassic.getBondedDevices()
      const device = paired[0]
      let connection = await device.isConnected()

      if (!connection) {
        console.log('Connecting')
        connection = await device.connect()
      }

      console.log('Connected')

      const sub = device.onDataReceived((event) => {
        setData(event.data)
      })

      setSubscription(sub)
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

      if (subscription) {
        subscription.remove()
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

  return { connected, loading, handleConnectDevice }
}

function DeviceStatusCard() {
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
  const [data, setData] = useHazardData()
  const { connected, loading, handleConnectDevice } =
    useBluetoothDevice(setData)

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
