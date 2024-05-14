import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";

export const MapScreen = ({ route }) => {
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    setLocation(route?.params?.location);
  }, []);

  const onBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          ...location,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        <Pressable onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={48} color="white" />
        </Pressable>
        {location && <Marker title="I am here" coordinate={location} description="Hello" />}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: 60,
    left: 20,
    width: 80,
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "rgba(17, 19, 25, 0.4)",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
