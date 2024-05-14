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
  ScrollView,
} from "react-native";
import { CameraContainer } from "../components/CameraContainer";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { auth } from "../config";
import { writeDataToFirestore } from "../db";
import { getLocation } from "../utils/getLocation";
import Toast from "react-native-toast-message";

export const CreatePostsScreen = () => {
  const height = useHeaderHeight();

  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [postName, setPostName] = useState("");
  const [photoUri, setPhotoUri] = useState(null);

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

    const loc = await getLocation(coords);
    setAddress(loc);
  };

  const createPost = async () => {
    await writeDataToFirestore({
      photoUri,
      postTitle: postName,
      likes: [],
      location: location,
      owner: auth.currentUser.uid,
    });
  };

  const onResetPost = () => {
    setAddress("");
    setPostName("");
    setPhotoUri(null);
  };

  const isFormValid = postName !== "" && address !== "";

  const onCreatePost = async () => {
    if (!isFormValid) {
      return Toast.show({
        type: "error",
        text1: "Fill in all fields!",
        topOffset: 64,
        text1Style: { fontSize: 20, color: "red" },
        visibilityTime: 3000,
      });
    }

    await createPost();
    Toast.show({
      type: "success",
      text1: "Post was created!",
      topOffset: 64,
      text1Style: { fontSize: 20, color: "green" },
      visibilityTime: 3000,
    });
    navigation.navigate("Profile");
    onResetPost();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={height}>
        <ScrollView style={styles.container}>
          <CameraContainer
            onTakeShot={onTakeShot}
            onResetPost={onResetPost}
            photoUri={photoUri}
            setPhotoUri={setPhotoUri}
          />
          <View>
            <View style={styles.inputBox}>
              <TextInput value={postName} onChangeText={setPostName} style={styles.input} placeholder="Title..." />
              <Ionicons style={styles.icon} name="reader" size={16} color="#737373" />
            </View>
            <View style={styles.inputBox}>
              <TextInput value={address} onChangeText={setAddress} style={styles.input} placeholder="Location..." />
              <Ionicons style={styles.icon} name="location" size={16} color="#737373" />
            </View>
          </View>
          <Pressable onPress={onCreatePost} style={isFormValid ? styles.button : [styles.button, { opacity: 0.6 }]}>
            <Text style={styles.buttonText}>Publish</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
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
