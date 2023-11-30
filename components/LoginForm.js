import { StyleSheet, View, TextInput, Text, Pressable } from "react-native";

export const LoginForm = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Увійти</Text>
      <TextInput style={styles.input} placeholder="Адреса електронної пошти" />
      <View>
        <TextInput style={styles.input} placeholder="Пароль" />
        <Pressable style={styles.showButton}>
          <Text>Показати</Text>
        </Pressable>
      </View>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Увійти</Text>
      </Pressable>

      <Pressable>
        <Text style={styles.loginBtn}>
          Немає акаунту? <Text style={styles.innerText}>Зареєструватися</Text>
        </Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    maxHeight: 489,
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: "25px 25px 0px 0px",
    marginTop: "auto",
    overflow: "visible",
  },
  addPhotoBox: {
    position: "absolute",
    left: "35%",
    top: "-12%",
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
  inputBox: {
    justifyContent: "center",
  },
  input: {
    marginBottom: 16,
    width: 343,
    height: 50,
    backgroundColor: "#f6f6f6",
    borderRadius: 10,
    color: "#BDBDBD",
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
  loginBtn: {
    fontSize: 16,
    color: "#1B4371",
    fontFamily: "Roboto400",
  },
  innerText: {
    textDecorationLine: "underline",
  },
});
