import { ScrollView, View, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions } from "react-native";
import { SearchUserForm } from "../components/SearchUserForm";
import { useState } from "react";
import { UserPosts } from "../components/UserPosts";
import { LinearGradient } from "expo-linear-gradient";
export const PostsScreen = () => {
  const [userPosts, setUserPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <LinearGradient colors={["rgba(3, 166, 181, 0.3)", "rgba(0, 189, 136, 0.3)", "rgba(45, 181, 142, 0.3)"]}>
      <ScrollView style={styles.mainContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <SearchUserForm setUserPosts={setUserPosts} setCurrentUser={setCurrentUser} />
            {userPosts && <UserPosts posts={userPosts} currentUser={currentUser} setUserPosts={setUserPosts} />}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  container: {
    minHeight: Dimensions.get("window").height,
  },
});
