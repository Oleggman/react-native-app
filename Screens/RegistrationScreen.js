import { StyleSheet, ImageBackground } from "react-native";
import { RegistrationForm } from "../components/RegistrationForm";
import bg from "../images/bg.jpg";

export const RegistrationScreen = () => {
  return (
    <ImageBackground source={bg} style={styles.mainBg}>
      <RegistrationForm />
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  mainBg: {
    width: "100%",
    height: "100%",
  },
});
