import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  ScrollView
} from 'react-native';
import { DataTable } from 'react-native-paper';
import React from 'react';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.upperNav}>
        <Image
          source={require('../assets/notification.png')}
          style={styles.notificationIcon}
        />
        <Image source={require('../assets/exit.png')} style={styles.exitIcon} />
      </View>
      <ScrollView style={styles.scrollPane}>
        <View style={styles.mainContent}>
          <View style={styles.connectArea}>
            <Text style={styles.connectTitle}>FlashGuard Connect</Text>
            <Button
              title="Connect Device"
              icon={
                <Image
                  source={require('../assets/bluetooth.png')}
                  style={styles.bluetoothIcon}
                />
              }
              onPress={() => {}}
            />
            <View style={styles.deviceStatus}>
              <Text style={styles.deviceStatusText}>Device Status: </Text>
              <Image
                source={require('../assets/connected.png')}
                style={styles.statusIcon}
              />
            </View>
          </View>
          <View style={styles.stimulusDetails}>
            <Text style={styles.stimulusDetailsTitle}>
              Your Previous Stimulus Details
            </Text>
            <DataTable style={styles.table}>
              <DataTable.Header>
                <DataTable.Title>Type</DataTable.Title>
                <DataTable.Title>Frequency</DataTable.Title>
                <DataTable.Title>Duration</DataTable.Title>
                <DataTable.Title>Date and Time</DataTable.Title>
                <DataTable.Title>Intensity</DataTable.Title>
                <DataTable.Title>Location</DataTable.Title>
              </DataTable.Header>
              <DataTable.Row>
                <DataTable.Cell>Vibration</DataTable.Cell>
                <DataTable.Cell>5 Hz</DataTable.Cell>
                <DataTable.Cell>30 min</DataTable.Cell>
                <DataTable.Cell>Jan 1, 2021 10:00 AM</DataTable.Cell>
                <DataTable.Cell>50%</DataTable.Cell>
                <DataTable.Cell>Left wrist</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell>Sound</DataTable.Cell>
                <DataTable.Cell>10 Hz</DataTable.Cell>
                <DataTable.Cell>15 min</DataTable.Cell>
                <DataTable.Cell>Jan 2, 2021 11:00 AM</DataTable.Cell>
                <DataTable.Cell>70%</DataTable.Cell>
                <DataTable.Cell>Right ear</DataTable.Cell>
              </DataTable.Row>
            </DataTable>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Button
          title="Home"
          icon={
            <Image
              source={require('../assets/home.png')}
              style={styles.footerIcon}
            />
          }
          onPress={() => {}}
          style={styles.footerButton}
        />
        <Button
          title="Settings"
          icon={
            <Image
              source={require('../assets/settings.png')}
              style={styles.footerIcon}
            />
          }
          onPress={() => {}}
          style={styles.footerButton}
        />
        <Button
          title="Feedback"
          icon={
            <Image
              source={require('../assets/feedback.png')}
              style={styles.footerIcon}
            />
          }
          onPress={() => {}}
          style={styles.footerButton}
        />
        <Button
          title="Additional Details"
          icon={
            <Image
              source={require('../assets/details.png')}
              style={styles.footerIcon}
            />
          }
          onPress={() => {}}
          style={styles.footerButton}
        />
      </View>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  upperNav: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  notificationIcon: {
    width: 24,
    height: 24
  },
  exitIcon: {
    width: 24,
    height: 24,
    marginLeft: 16
  },
  scrollPane: {
    flex: 1,
    backgroundColor: '#00008B'
  },
  mainContent: {
    padding: 32
  },
  connectArea: {
    marginBottom: 32
  },
  connectTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16
  },
  bluetoothIcon: {
    width: 24,
    height: 24,
    marginRight: 8
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },
  deviceStatusText: {
    fontSize: 16,
    color: '#fff'
  },
  statusIcon: {
    width: 24,
    height: 24,
    marginLeft: 8
  },
  stimulusDetails: {
    marginTop: 32
  },
  stimulusDetailsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16
  },
  stimulusTable: {
    width: '100%'
  },
  table: {
    backgroundColor: '#add8e6',
    fontSize: 16
  },

  footer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#fff'
  },
  footerButton: {
    flex: 1
  },
  footerIcon: {
    width: 24,
    height: 24,
    marginRight: 8
  }
});
