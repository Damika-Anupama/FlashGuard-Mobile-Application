import React, { useContext } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { format } from 'date-fns'
import { useNavigation } from '@react-navigation/native'
import IncidentsContext from '../contexts/IncidentsContext'

const getFormattedDate = () => {
  // Function to return date as Sunday, 1st January
  const date = new Date()
  return format(date, 'EEEE, do MMMM')
}

const getNumberOfIncidentsForToday = (incidents) => {
  // Function to return number of incidents for today
  // incident.endTime is in format "2023-01-15T10:04:26.904Z"
  const today = new Date()
  const todayDate = today.getDate()
  const todayMonth = today.getMonth()
  const todayYear = today.getFullYear()
  const numberOfIncidents = incidents.filter((incident) => {
    const incidentDate = new Date(incident.endTime).getDate()
    const incidentMonth = new Date(incident.endTime).getMonth()
    const incidentYear = new Date(incident.endTime).getFullYear()
    return (
      incidentDate === todayDate &&
      incidentMonth === todayMonth &&
      incidentYear === todayYear
    )
  })
  return numberOfIncidents.length
}

export default function Home() {
  const { incidents } = useContext(IncidentsContext)

  const navigation = useNavigation()

  return (
    <ScrollView>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-4 font-bold text-blue-900">
            {getFormattedDate()}
          </Text>
          <Text className="mb-2 text-3xl font-bold">FlashGuard</Text>

          <Text className="mb-2 text-gray-700">
            Here you can view your daily stats and device status. You can also
            view more details on incidents and real-time status in the
            Dashboard.
          </Text>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Text className="mb-2 text-xl font-bold">Stats for Today</Text>
          <Text className="mb-5 text-gray-700">
            Your daily stats are displayed below.
          </Text>
          <View className="flex flex-row justify-between">
            <Text className="text-lg">Hazards blocked </Text>
            <Text className="text-lg">133</Text>
          </View>
          <View className="flex flex-row justify-between">
            <Text className="text-lg">Incidents </Text>
            <Text className="text-lg">
              {getNumberOfIncidentsForToday(incidents)}
            </Text>
          </View>
        </Card.Content>
      </Card>
      <Card className="m-4 bg-white" mode="elevated">
        <Card.Content>
          <Button
            mode="outlined"
            onPress={() => {
              navigation.navigate('Help')
            }}
          >
            Learn more about FlashGuard
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}
