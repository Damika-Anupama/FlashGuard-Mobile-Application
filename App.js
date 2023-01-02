import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "./pages/SignUp"; // import the SignUp component
import SignIn from "./pages/SignIn"; // import the SignIn component
import Dashboard from "./pages/Dashboard"; // import the SignIn component
import { Provider as PaperProvider } from "react-native-paper";

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Sign Up" component={SignUp} />
          <Stack.Screen name="Sign In" component={SignIn} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const Welcome = (props) => {
  return (
    <LinearGradient colors={["#1E90FF", "#00008B"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to FlashGuard App</Text>
        <Image
          source={require("./assets/flashguard.jpg")}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Sign Up"
            onPress={() => props.navigation.navigate("Sign Up")}
          />
          <Button
            title="Sign In"
            onPress={() => props.navigation.navigate("Sign In")}
          />
        </View>
        <StatusBar style="light" />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginVertical: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 8,
    margin: 8,
  },
});

export default App;
