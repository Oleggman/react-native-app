import { useState } from "react";
import { View, TextInput, StyleSheet, Text, Pressable, KeyboardAvoidingView } from "react-native";
import { getPostsByUserFromFireStore } from "../db";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

export const SearchUserForm = ({ setUserPosts, setCurrentUser }) => {
  const navigation = useNavigation();

  const [searchedUser, setSearchedUser] = useState("");

  const onSearchUser = async () => {
    const res = await getPostsByUserFromFireStore(searchedUser);
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
    setCurrentUser(searchedUser);
    setSearchedUser("");
    setUserPosts(res);
  };

  const onClear = () => {
    setSearchedUser("");
  };
  //TODO: Fix searchbar
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View style={styles.inputBox}>
        <TextInput
          value={searchedUser}
          onChangeText={setSearchedUser}
          style={styles.input}
          placeholder="Search for users"
          placeholderTextColor="#c0c0c0"
          cursorColor="#fff"
        />
        <Pressable style={styles.searchButton} onPress={onSearchUser}>
          <FontAwesome name="search" size={24} color="white" />
        </Pressable>
        {searchedUser !== "" && (
          <Pressable style={styles.clearButton} onPress={onClear}>
            <Entypo name="cross" size={24} color="white" />
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    alignItems: "center",
    position: "relative",
  },
  input: {
    width: "100%",
    height: 60,
    paddingHorizontal: 48,
    borderColor: "#fff",
    fontSize: 20,
    color: "#fff",
    backgroundColor: "#263a43",
    fontFamily: "Roboto400",
  },
  searchButton: {
    position: "absolute",
    left: 12,
    top: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    position: "absolute",
    right: 12,
    top: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
