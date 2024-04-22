import { ScrollView, StyleSheet, View, Text } from "react-native";
import { PostItem } from "../components/PostItem";
import { useEffect, useState } from "react";
import { getPostsByUserFromFireStore } from "../db";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";

export const PostsScreen = () => {
  const [posts, setPosts] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getAllPostsByUser = async () => {
      const posts = await getPostsByUserFromFireStore(auth.currentUser.uid);
      setPosts(posts);
    };

    getAllPostsByUser();

    const unsubscribe = navigation.addListener("focus", () => {
      getAllPostsByUser();
    });

    return unsubscribe;
  }, []);

  return (
    posts && (
      <ScrollView style={styles.container}>
        {posts?.length > 0 ? (
          <View style={styles.list}>
            {posts.map((post) => (
              <PostItem key={post.data.uid} post={post.data} />
            ))}
          </View>
        ) : (
          <Text style={styles.errorBadge}>
            У вас ще немає публікацій. Виправте це зараз та створіть свою першу публікацію!
          </Text>
        )}
      </ScrollView>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  list: {
    flex: 1,
    gap: 20,
    justifyContent: "center",
    marginBottom: 48,
  },
  errorBadge: {
    marginTop: 28,
    backgroundColor: "#FFF0D8",
    borderColor: "#FF6C00",
    borderWidth: 3,
    textAlign: "center",
    padding: 20,
    color: "#FF6C00",
    fontSize: 20,
    fontFamily: "Roboto700",
  },
});
