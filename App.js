import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFonts } from "expo-font";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto400: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto500: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto700: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <RegistrationScreen />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
