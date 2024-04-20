import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CameraContainer } from "../components/CameraContainer";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";

export const CreatePostsScreen = () => {
  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [postName, setPostName] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      setStatus(status);
      if (status !== "granted") {
        alert("Permission to access location was denied");
      }
    })();
  }, []);

  const onTakeShot = async () => {
    if (status !== "granted") {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setLocation(coords);

    const { latitude, longitude } = coords;
    let response = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    for (let item of response) {
      let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

      setAddress(address);
    }
  };

  const onResetPost = () => {
    setAddress("");
    setPostName("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <CameraContainer onTakeShot={onTakeShot} onResetPost={onResetPost} />
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View>
            <View style={styles.inputBox}>
              <TextInput value={postName} onChangeText={setPostName} style={styles.input} placeholder="Назва..." />
              <Ionicons style={styles.icon} name="reader" size={16} color="#737373" />
            </View>
            <View style={styles.inputBox}>
              <TextInput value={address} onChangeText={setAddress} style={styles.input} placeholder="Місцевість..." />
              <Ionicons style={styles.icon} name="location" size={16} color="#737373" />
            </View>
          </View>
        </KeyboardAvoidingView>
        <Pressable onPress={() => navigation.navigate("Публікації")} style={styles.button}>
          <Text style={styles.buttonText}>Опублікувати</Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  inputBox: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 16,
  },
  input: {
    width: 343,
    height: 50,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#E8E8E8",
    fontSize: 16,
    fontFamily: "Roboto400",
  },
  button: {
    marginTop: 24,
    marginBottom: 16,
    width: 343,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
    marginBottom: 32,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto400",
    textAlign: "center",
  },
});
