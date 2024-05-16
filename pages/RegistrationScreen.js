import {
  StyleSheet,
  ImageBackground,
  View,
  Text,
  KeyboardAvoidingView,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RegistrationForm } from "../components/RegistrationForm";
import bg from "../images/bg.jpg";
import AddPhotoBox from "../components/AddPhotoBox";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

export const RegistrationScreen = () => {
  const [userPhoto, setUserPhoto] = useState(null);

  const navigation = useNavigation();

  const ImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setUserPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.container}>
            {userPhoto ? (
              <View style={styles.addPhotoBox}>
                <Image style={styles.photo} source={{ uri: userPhoto }} />
                <Pressable style={styles.resetPhoto} onPress={() => setUserPhoto(null)}>
                  <MaterialIcons name="cancel" size={24} color="#263a43" />
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={styles.addPhotoBox}
                onPress={() => {
                  ImagePick();
                }}>
                <AddPhotoBox />
              </Pressable>
            )}
            <Text style={styles.title}>Sign up</Text>
            <RegistrationForm userPhoto={userPhoto} />
            <Pressable onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginBtn}>
                Already have an account? <Text style={styles.innerText}>Log in</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainBg: {
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    maxHeight: 549,
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    overflow: "visible",
  },
  addPhotoBox: {
    position: "absolute",
    top: -60,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 8,
  },
  resetPhoto: {
    position: "absolute",
  },
  title: {
    marginTop: 80,
    color: "#212121",
    textAlign: "center",
    fontFamily: "Roboto500",
    fontSize: 30,
    letterSpacing: 0.3,
    marginBottom: 32,
  },
  loginBtn: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto400",
  },
  innerText: {
    textDecorationLine: "underline",
  },
});
