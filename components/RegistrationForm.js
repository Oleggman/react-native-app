import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { isRegisterValid } from "../utils/authValidation";
import { registerDB } from "../auth/authorization";
import { resetStates } from "../utils/resetStates";

export const RegistrationForm = () => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const onRegister = async () => {
    setError(null);

    if (isRegisterValid(login, email, password, setError)) {
      try {
        await registerDB({ email, password });
        console.log(`Registration credentials: ${login}, ${email}, ${password}`);
        navigation.navigate("Home", { screen: "PostsScreen" });
        resetStates(setLogin, setEmail, setPassword, setError);
      } catch (error) {
        setError(
          error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "Invalid credentials"
            : "Registration error"
        );
      }
    }
  };

  return (
    <View style={styles.inputBox}>
      <TextInput value={login} onChangeText={setLogin} style={styles.input} placeholder="Логін" />
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Адреса електронної пошти" />
      <View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
          placeholder="Пароль"
        />
        <Pressable style={styles.showButton}>
          <Text>Показати</Text>
        </Pressable>
      </View>
      {error && <Text style={styles.errorBadge}>{error}</Text>}
      <Pressable onPress={onRegister} style={styles.button}>
        <Text style={styles.buttonText}>Зареєструватися</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    color: "#000",
    fontFamily: "Roboto400",
    fontSize: 16,
    paddingLeft: 16,
  },
  showButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    width: 343,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 100,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto400",
    textAlign: "center",
  },
  errorBadge: {
    backgroundColor: "rgb(252, 228, 228)",
    borderColor: "rgb(252, 194, 195)",
    borderWidth: 2,
    textAlign: "center",
    padding: 20,
    color: "rgb(204, 0, 51)",
    fontZize: 16,
  },
});
