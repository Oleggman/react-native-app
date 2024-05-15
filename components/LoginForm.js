import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import { isLoginValid } from "../utils/authValidation";
import { loginDB } from "../auth/authorization";
import { resetStates } from "../utils/resetStates";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [secureText, setsScureText] = useState(true);

  const dispatch = useDispatch();

  const onLogin = async () => {
    setError(null);

    if (isLoginValid(email, password, setError)) {
      try {
        await loginDB({ email, password });
        console.log(`Login credentials: ${email}, ${password}`);
        dispatch(login());
        resetStates(setEmail, setPassword);
        setError(null);
      } catch (error) {
        setError(
          error.message === "Firebase: Error (auth/invalid-credential)." ? "Invalid credentials" : "Login error"
        );
      }
    }
  };

  const onShowPassword = () => {
    setsScureText((prev) => !prev);
  };

  return (
    <View style={styles.inputBox}>
      <TextInput value={email} onChangeText={setEmail} style={styles.input} placeholder="Email" />
      <View>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
          style={styles.input}
          placeholder="Password"
        />
        <Pressable style={styles.showButton} onPress={onShowPassword}>
          <Text>{secureText ? "Show" : "Hide"}</Text>
        </Pressable>
        {error && <Text style={styles.errorBadge}>{error}</Text>}
      </View>
      <Pressable onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>Sign in</Text>
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
    right: 24,
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
  },
});
