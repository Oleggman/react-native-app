import { View, StyleSheet, Text } from "react-native";
import { PostItem } from "./PostItem";

export const UserPosts = ({ posts, currentUser }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.profileIdText}>Пости користувача</Text>
      <Text style={styles.profileId}>{currentUser}</Text>
      <View style={styles.list}>
        {posts.map((post) => (
          <PostItem key={post.data.id} post={post.data} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
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
