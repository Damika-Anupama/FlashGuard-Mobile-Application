import React, { useContext, useEffect, useState } from 'react'
import { ScrollView, Text, View, PermissionsAndroid } from 'react-native'
import { Button, Card } from 'react-native-paper'
import RNBluetoothClassic from 'react-native-bluetooth-classic'
import ConnectionContext from '../contexts/ConnectionContext'
import HazardDetectedContext from '../contexts/HazardDetectedContext'

const requestPermissions = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    )

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permissions granted')
    } else {
      console.warn('Permissions not granted')
    }
  } catch (err) {
    console.warn(err)
  }
}

export default function Device() {
  const { connected, setConnected } = useContext(ConnectionContext)
  const { hazardDetected, setHazardDetected } = useContext(
    HazardDetectedContext
  )
  const [loading, setLoading] = useState(false)

  const connect = async () => {
    const paired = await RNBluetoothClassic.getBondedDevices()
    const device = paired[0]

    let connection = await device.isConnected()

    if (!connection) {
      console.log('Connecting')
      connection = await device.connect()
    }

    console.log('Connected')

    device.onDataReceived((data) => {
      console.log(data)
      plotData()
    })
  }

  const plotData = () => {
    setHazardDetected(true)
  }

  // Mock plot data by calling plotData() every 2 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     plotData()
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [])

  const handleConnectDevice = async () => {
    await requestPermissions()
    setLoading(true)
    setConnected(true)

    connect().then(() => {
      setConnected(true)
      setLoading(false)
    })
  }

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

      {connected ? (
        <Card className="m-4 bg-white " mode="elevated">
          <Card.Content>
            <Text className="mb-3 text-xl font-bold">Device Status</Text>
            <Text className="mb-5 text-gray-700">
              Make sure you keep your device connected to your phone at all
              times. If you are not using your device, make sure you disconnect
              it to preserve battery life.
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
      ) : null}
    </ScrollView>
  )
}
