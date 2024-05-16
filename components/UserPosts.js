import { View, StyleSheet } from "react-native";
import { PostItem } from "./PostItem";
import { getPostsByUserFromFireStore } from "../db";
import { UserProfile } from "./UserProfile";
//TODO: Rewrite posts fetch with login
export const UserPosts = ({ posts, currentUser, setUserPosts }) => {
  const updateUserPosts = async () => {
    const res = await getPostsByUserFromFireStore(currentUser);
    setUserPosts(res);
  };

  return (
    <View style={styles.container}>
      <UserProfile uid={currentUser} />
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
});
