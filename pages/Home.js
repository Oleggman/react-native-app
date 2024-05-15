import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import { PostsScreen } from "./PostsScreen";
import { CreatePostsScreen } from "./CreatePostsScreen";
import { ProfileScreen } from "./ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Tabs = createBottomTabNavigator();

export const Home = () => {
  const dispatch = useDispatch();

  return (
    <Tabs.Navigator
      initialRouteName={"Profile"}
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerTitleAlign: "center",
        activeTintColor: "#03a2b1",
        inactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Posts") {
            iconName = "grid";
          } else if (route.name === "Create a post") {
            return <Ionicons name={"add-circle"} size={36} color={color} />;
          } else if (route.name === "Profile") {
            iconName = "person-sharp";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tabs.Screen name="Posts" component={PostsScreen} />
      <Tabs.Screen name="Create a post" component={CreatePostsScreen} />
      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerRight: () => (
            <Pressable
              onPress={() => {
                dispatch(logout());
              }}
              style={{ marginRight: 16 }}>
              <MaterialIcons name="logout" size={24} />
            </Pressable>
          ),
        }}
      />
    </Tabs.Navigator>
  );
};
