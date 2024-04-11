import {
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  View,
  Text,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LoginForm } from "../components/LoginForm";
import bg from "../images/bg.jpg";

export const LoginScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <View style={styles.container}>
            <Text style={styles.title}>Увійти</Text>
            <LoginForm />

            <Pressable onPress={() => navigation.navigate("RegistrationScreen")}>
              <Text style={styles.loginBtn}>
                Немає акаунту? <Text style={styles.innerText}>Зареєструватися</Text>
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
    maxHeight: 460,
    height: "100%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: "auto",
    overflow: "visible",
  },
  title: {
    marginTop: 32,
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
