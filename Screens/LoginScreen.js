import { StyleSheet, ImageBackground, KeyboardAvoidingView, View, Text, Pressable } from "react-native";
import { LoginForm } from "../components/LoginForm";
import bg from "../images/bg.jpg";

export const LoginScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={styles.container}>
          <Text style={styles.title}>Увійти</Text>
          <LoginForm />

          <Pressable>
            <Text style={styles.loginBtn}>
              Немає акаунту? <Text style={styles.innerText}>Зареєструватися</Text>
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
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
    maxHeight: 420,
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
