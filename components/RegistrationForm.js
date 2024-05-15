import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useState } from "react";
import { isRegisterValid } from "../utils/authValidation";
import { registerDB } from "../auth/authorization";
import { resetStates } from "../utils/resetStates";
import { useDispatch } from "react-redux";
import { login as loginUser } from "../redux/slices/authSlice";
import { writeUserToFirestore } from "../db";

export const RegistrationForm = ({ userPhoto }) => {
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [secureText, setsScureText] = useState(true);

  const dispatch = useDispatch();

  const onRegister = async () => {
    setError(null);

    if (isRegisterValid(login, email, password, setError)) {
      try {
        console.log(0);
        const user = await registerDB({ email, password, login });
        console.log(3);
        if (!user) {
          console.log(user);
          throw new Error();
        }
        console.log(4);

        await writeUserToFirestore({
          userId: user.user.uid,
          login,
          email,
          avatar: userPhoto,
          posts: [],
        });

        console.log(`Registration credentials: ${login}, ${email}, ${password}`);
        dispatch(loginUser({ payload: login }));
        resetStates(setLogin, setEmail, setPassword);
        setError(null);
      } catch (error) {
        setError(
          error.message === "Firebase: Error (auth/email-already-in-use)."
            ? "This account is already in use"
            : "Registration error"
        );
      }
    }
  };

  const onShowPassword = () => {
    setsScureText((prev) => !prev);
  };

  return (
    <View style={styles.inputBox}>
      <TextInput value={login} onChangeText={setLogin} style={styles.input} placeholder="Login" />
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
      </View>
      {error && <Text style={styles.errorBadge}>{error}</Text>}
      <Pressable onPress={onRegister} style={styles.button}>
        <Text style={styles.buttonText}>Sign up</Text>
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
  },
});
