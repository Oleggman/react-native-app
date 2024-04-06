import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./Screens/LoginScreen";
import { RegistrationScreen } from "./Screens/RegistrationScreen";
import { Home } from "./Screens/Home";
import { MapScreen } from "./Screens/MapScreen";
import { Text } from "react-native";

const MainStack = createStackNavigator();

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
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="RegistrationScreen" component={RegistrationScreen} options={{ headerShown: false }} />
        <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
