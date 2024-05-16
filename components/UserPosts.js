import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { PostItem } from "./PostItem";
import { getPostsByUserFromFireStore } from "../db";
import { UserProfile } from "./UserProfile";
import { useState } from "react";

export const UserPosts = ({ posts, currentUser, setUserPosts }) => {
  const [avatar, setAvatar] = useState(null);

  const updateUserPosts = async () => {
    const res = await getPostsByUserFromFireStore(currentUser);
    setUserPosts(res);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <UserProfile login={currentUser} setAvatar={setAvatar} />
        <View style={styles.list}>
          {posts.map((post) => (
            <PostItem
              key={post.id}
              post={post.data}
              postId={post.id}
              getAllPostsByUser={updateUserPosts}
              login={currentUser}
              avatar={avatar}
            />
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  list: {
    flex: 1,
    gap: 40,
    marginBottom: 48,
    justifyContent: "center",
  },
});
