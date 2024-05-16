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
  Dimensions,
} from "react-native";
import { CameraContainer } from "../components/CameraContainer";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { writeDataToFirestore } from "../db";
import { getLocation } from "../utils/getLocation";
import Toast from "react-native-toast-message";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { selectLogin } from "../redux/slices/authSlice";

export const CreatePostsScreen = () => {
  const height = useHeaderHeight();

  const [status, setStatus] = useState(null);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [postName, setPostName] = useState("");
  const [photoUri, setPhotoUri] = useState(null);
  const [focusInput, setFocusInput] = useState("");
  const [processing, setProcessing] = useState(false);

  const navigation = useNavigation();

  const login = useSelector(selectLogin);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
    if (processing) return;
    setProcessing(true);
    await writeDataToFirestore({
      photoUri,
      postTitle: postName,
      likes: [],
      location: location,
      owner: login,
    });
    setProcessing(false);
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
        <LinearGradient colors={["rgba(3, 166, 181, 0.3)", "rgba(0, 189, 136, 0.3)", "rgba(45, 181, 142, 0.3)"]}>
          <ScrollView style={styles.container}>
            <CameraContainer
              onTakeShot={onTakeShot}
              onResetPost={onResetPost}
              photoUri={photoUri}
              setPhotoUri={setPhotoUri}
            />
            <View style={styles.form}>
              <View style={styles.inputBox}>
                <TextInput
                  onFocus={() => setFocusInput("postName")}
                  onBlur={() => setFocusInput("")}
                  value={postName}
                  onChangeText={setPostName}
                  style={[styles.input, focusInput === "postName" && { borderBottomColor: "#263a43" }]}
                  placeholder="Title..."
                  placeholderTextColor="#737373"
                />
                <Ionicons
                  style={styles.icon}
                  name="reader"
                  size={16}
                  color={focusInput === "postName" ? "#263a43" : "#737373"}
                />
              </View>
              <View style={styles.inputBox}>
                <TextInput
                  onFocus={() => setFocusInput("address")}
                  onBlur={() => setFocusInput("")}
                  value={address}
                  onChangeText={setAddress}
                  style={[styles.input, focusInput === "address" && { borderBottomColor: "#263a43" }]}
                  placeholder="Location..."
                  placeholderTextColor="#737373"
                />
                <Ionicons
                  style={styles.icon}
                  name="location"
                  size={16}
                  color={focusInput === "address" ? "#263a43" : "#737373"}
                />
              </View>
              <Pressable onPress={onCreatePost} style={isFormValid ? styles.button : [styles.button, { opacity: 0.6 }]}>
                <Text style={styles.buttonText}>Publish</Text>
              </Pressable>
            </View>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: Dimensions.get("window").height,
  },
  form: {
    alignItems: "center",
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
    borderBottomColor: "#a0a0a0",
    fontSize: 16,
    fontFamily: "Roboto400",
    color: "#263a43",
  },
  button: {
    marginTop: 24,
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
