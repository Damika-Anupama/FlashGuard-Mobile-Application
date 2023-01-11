import { useNavigation } from '@react-navigation/native'
import React, { useCallback } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Avatar, Card, List } from 'react-native-paper'

export default function Profile() {
  const navigation = useNavigation()

  const ListIconRight = useCallback(
    (props) => <List.Icon {...props} icon="chevron-right" />,
    []
  )
  const ListIconLogOut = useCallback(
    (props) => <List.Icon {...props} icon="logout" />,
    []
  )

  return (
    <ScrollView className="mb-2 bg-gray-50">
      <Card className="m-4 bg-white">
        <Card.Content className="flex items-center justify-center p-4">
          <Avatar.Image
            size={100}
            source={require('../../assets/profile.jpg')}
            className="mb-2"
          />
          <Text className="text-2xl font-bold text-gray-700">
            John Roberson
          </Text>
          <Text className="text-lg font-bold text-gray-500">California</Text>
        </Card.Content>
      </Card>

      <View>
        <Card className="m-4 bg-white">
          <Card.Content className="p-2">
            <List.Item
              title="Account"
              description=""
              right={ListIconRight}
              onPress={() => {}}
            />
            <List.Item
              title="Settings"
              description=""
              right={ListIconRight}
              onPress={() => {
                navigation.navigate('Settings')
              }}
            />
            <List.Item
              title="Help"
              description=""
              right={ListIconRight}
              onPress={() => {}}
            />
            <List.Item
              title="Logout"
              description=""
              right={ListIconLogOut}
              onPress={() => {}}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  )
}
