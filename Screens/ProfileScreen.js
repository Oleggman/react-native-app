import { ScrollView, View, TouchableWithoutFeedback, Keyboard, StyleSheet, Dimensions } from "react-native";
import { SearchUserForm } from "../components/SearchUserForm";
import { useState } from "react";
import { UserPosts } from "../components/UserPosts";

export const ProfileScreen = () => {
  const [userPosts, setUserPosts] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <SearchUserForm setUserPosts={setUserPosts} setCurrentUser={setCurrentUser} />
          {userPosts && <UserPosts posts={userPosts} currentUser={currentUser} />}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("window").height - 180,
    height: "100%",
  },
});
