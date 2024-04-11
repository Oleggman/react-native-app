import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { isLoginValid } from "../utils/authValidation";
import { loginDB } from "../auth/authorization";
import { resetStates } from "../utils/resetStates";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigation();

  const onLogin = async () => {
    setError(null);

    if (isLoginValid(email, password, setError)) {
      try {
        await loginDB({ email, password });
        console.log(`Login credentials: ${email}, ${password}`);
        navigation.navigate("Home", { screen: "PostsScreen" });
        resetStates(setLogin, setEmail, setPassword, setError);
      } catch (error) {
        setError(
          error.message === "Firebase: Error (auth/invalid-credential)." ? "Invalid credentials" : "Login error"
        );
      }
    }
  };

  return (
    <View style={styles.inputBox}>
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
        {error && <Text style={styles.errorBadge}>{error}</Text>}
      </View>
      <Pressable onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>Увійти</Text>
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
    marginTop: 42,
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
