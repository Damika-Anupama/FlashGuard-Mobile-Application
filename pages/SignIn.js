import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, TextInput, Image, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

function SignIn({ navigation }) {
  return (
    <LinearGradient colors={["#1E90FF", "#00008B"]} style={styles.gradient}>
      <View style={styles.container}>
        <Image
          source={require("../assets/flashguard.jpg")}
          style={styles.image}
        />
        <Text style={styles.title}>Sign In for FlashGuard</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#fff"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry
        />
        <Button title="Sign Up" onPress={() => {}} />
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <Button
          title="Sign In with Microsoft"
          onPress={() => navigation.navigate("Dashboard")}
          style={styles.microsoftButton}
        />
        <Text style={styles.navigateText}>
          Don't have an account?{" "}
          <Text
            style={styles.navigateLink}
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </Text>
        </Text>
        <StatusBar style="light" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 8,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  input: {
    width: "80%",
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
    color: "#fff",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkboxText: {
    color: "#fff",
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  orContainer: {
    flexDirection: "row",
    marginVertical: 32,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  orText: {
    color: "#fff",
    marginHorizontal: 8,
  },
  microsoftButton: {
    marginVertical: 8,
  },
  navigateText: {
    color: "#fff",
    marginTop: 32,
  },
  navigateLink: {
    color: "#FFD700",
  },
});

export default SignIn;
