import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from 'react-native-paper';
import React from 'react';

export const Welcome = (props) => {
  return (
    <LinearGradient colors={['#1E90FF', '#00008B']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to FlashGuard App</Text>
        <Image
          source={require('../assets/flashguard.jpg')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => props.navigation.navigate('Sign Up')}
            mode="contained"
          >
            Sign Up
          </Button>
          <Button
            onPress={() => props.navigation.navigate('Sign In')}
            mode="contained"
          >
            Sign In
          </Button>
        </View>
        <StatusBar style="light" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    margin: 8
  }
});
