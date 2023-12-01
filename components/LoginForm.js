import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const onLogin = () => {
    console.log(`Credentials: ${email}, ${password}`);
    setEmail("");
    setPassword("");
    navigation.navigate("Home", { screen: "PostsScreen" });
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
});
