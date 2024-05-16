import { ScrollView, View, StyleSheet, Dimensions } from "react-native";
import { SearchUserForm } from "../components/SearchUserForm";
import { useState } from "react";
import { UserPosts } from "../components/UserPosts";
import { LinearGradient } from "expo-linear-gradient";

export const PostsScreen = () => {
  const [userPosts, setUserPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <LinearGradient colors={["rgba(3, 166, 181, 0.3)", "rgba(0, 189, 136, 0.3)", "rgba(45, 181, 142, 0.3)"]}>
      <View style={styles.container}>
        <SearchUserForm setUserPosts={setUserPosts} setCurrentUser={setCurrentUser} />
        <ScrollView style={styles.mainContainer}>
          {userPosts && <UserPosts posts={userPosts} currentUser={currentUser} setUserPosts={setUserPosts} />}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    minHeight: Dimensions.get("window").height - 320,
  },
  container: {
    height: "100%",
  },
});
