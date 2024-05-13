import { View, StyleSheet, Text } from "react-native";
import { PostItem } from "./PostItem";
import { getPostsByUserFromFireStore } from "../db";

export const UserPosts = ({ posts, currentUser, setUserPosts }) => {
  const updateUserPosts = async () => {
    const res = await getPostsByUserFromFireStore(currentUser);
    setUserPosts(res);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.profileIdText}>Posts of a user</Text>
      <Text style={styles.profileId}>{currentUser}</Text>
      <View style={styles.list}>
        {posts.map((post) => (
          <PostItem key={post.id} post={post.data} postId={post.id} getAllPostsByUser={updateUserPosts} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  list: {
    flex: 1,
    gap: 20,
    marginBottom: 48,
    justifyContent: "center",
  },
  profileIdText: {
    fontFamily: "Roboto700",
    fontSize: 24,
    marginBottom: 12,
    textAlign: "center",
  },
  profileId: {
    fontFamily: "Roboto400",
    fontSize: 20,
    marginBottom: 24,
    textAlign: "center",
  },
});
