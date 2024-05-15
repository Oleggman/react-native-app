import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "../pages/LoginScreen";
import { RegistrationScreen } from "../pages/RegistrationScreen";
import { Home } from "../pages/Home";
import { MapScreen } from "../pages/MapScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { selectAuthState } from "../redux/slices/authSlice";

const MainStack = createStackNavigator();

export default function AppNavigator() {
  const isAuthenticated = useSelector(selectAuthState);

  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="RegistrationScreen">
        {!isAuthenticated ? (
          <>
            <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
            <MainStack.Screen
              name="RegistrationScreen"
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <MainStack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <MainStack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
          </>
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  );
}
