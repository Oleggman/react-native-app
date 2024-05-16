import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";
import AppNavigator from "./navigators/appNavigator";
import { LogBox } from "react-native";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto400: require("./assets/fonts/Roboto-Regular.ttf"),
    Roboto500: require("./assets/fonts/Roboto-Medium.ttf"),
    Roboto700: require("./assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast />
    </Provider>
  );
}

LogBox.ignoreAllLogs();
