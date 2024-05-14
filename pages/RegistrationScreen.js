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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RegistrationForm } from "../components/RegistrationForm";
import bg from "../images/bg.jpg";
import AddPhotoBox from "../components/AddPhotoBox";

export const RegistrationScreen = () => {
  const navigation = useNavigation();
  //FIXME: not always form resets after navigation
  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.container}>
            <AddPhotoBox style={styles.addPhotoBox} />
            <Text style={styles.title}>Sign up</Text>
            <RegistrationForm />
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
    left: "35%",
    top: "-12%",
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