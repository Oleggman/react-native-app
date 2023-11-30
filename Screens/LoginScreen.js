import { StyleSheet, ImageBackground } from "react-native";
import { LoginForm } from "../components/LoginForm";
import bg from "../images/bg.jpg";

export const LoginScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <LoginForm />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  mainBg: {
    width: "100%",
    height: "100%",
  },
});
