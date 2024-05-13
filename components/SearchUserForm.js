import { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, KeyboardAvoidingView } from "react-native";
import { getPostsByUserFromFireStore } from "../db";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";

export const SearchUserForm = ({ setUserPosts, setCurrentUser }) => {
  const navigation = useNavigation();

  const [searchedUserId, setSearchedUserId] = useState("");
  //TODO: search posts by user login
  const onSearchUser = async () => {
    const res = await getPostsByUserFromFireStore(searchedUserId);
    if (!res?.length) {
      Toast.show({
        type: "error",
        text1: "Not found!",
        text2: "No posts was found.",
        topOffset: 64,
        text1Style: { fontSize: 20, color: "red" },
        text2Style: { fontSize: 16, color: "red" },
        visibilityTime: 2000,
      });
      return;
    }

    navigation.navigate("Posts", { userPosts: res });
    setCurrentUser(searchedUserId);
    setSearchedUserId("");
    setUserPosts(res);
  };

  const onResetUser = () => {
    setUserPosts(null);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.inputBox}>
        <Text style={styles.searchUserText}>Search for users</Text>
        <TextInput
          value={searchedUserId}
          onChangeText={setSearchedUserId}
          style={styles.input}
          placeholder="Enter user ID"
        />
        <View style={styles.buttonsContainer}>
          <Pressable onPress={onSearchUser} style={styles.button}>
            <Text style={styles.buttonText}>Search</Text>
          </Pressable>
          <Pressable onPress={onResetUser} style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    paddingTop: 28,
    alignItems: "center",
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#FFF",
  },
  searchUserText: {
    fontFamily: "Roboto700",
    fontSize: 24,
    marginBottom: 24,
  },
  input: {
    width: 343,
    height: 50,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF6C00",
    paddingHorizontal: 20,
    fontSize: 18,
    color: "#333",
    backgroundColor: "#FFF",
    color: "#000",
    fontFamily: "Roboto400",
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 20,
  },
  button: {
    marginTop: 16,
    marginBottom: 16,
    width: 160,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 20,
    backgroundColor: "#FF6C00",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Roboto400",
    textAlign: "center",
  },
});
