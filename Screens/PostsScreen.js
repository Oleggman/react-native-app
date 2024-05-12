import { ScrollView, StyleSheet, View, Text } from "react-native";
import { PostItem } from "../components/PostItem";
import { useEffect, useState } from "react";
import { getPostsByUserFromFireStore } from "../db";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";
import { UserProfile } from "../components/UserProfile";
import Toast from "react-native-toast-message";

export const PostsScreen = () => {
  const [posts, setPosts] = useState(null);

  const navigation = useNavigation();

  const getAllPostsByUser = async () => {
    const posts = await getPostsByUserFromFireStore(auth.currentUser.uid);
    setPosts(posts);
  };

  useEffect(() => {
    getAllPostsByUser();

    const unsubscribe = navigation.addListener("focus", () => {
      getAllPostsByUser();
    });

    return unsubscribe;
  }, []);

  const onDeletePost = (id) => {
    Toast.show({
      type: "info",
      text1: "Пост видалено!",
      topOffset: 64,
      text1Style: { fontSize: 20, color: "blue" },
      visibilityTime: 3000,
    });
    navigation.navigate("Профіль");
    setPosts((posts) => posts.filter((post) => post.id !== id));
  };

  return (
    <ScrollView>
      <UserProfile uid={auth.currentUser.uid} />
      {posts && (
        <View style={styles.container}>
          {posts?.length > 0 ? (
            <View style={styles.list}>
              {posts.map((post) => (
                <PostItem
                  key={post.id}
                  post={post.data}
                  postId={post.id}
                  onDeletePost={onDeletePost}
                  getAllPostsByUser={getAllPostsByUser}
                  ownPost
                />
              ))}
            </View>
          ) : (
            <Text style={styles.errorBadge}>
              У вас ще немає публікацій. Виправте це зараз та створіть свою першу публікацію!
            </Text>
          )}
        </View>
      )}
    </ScrollView>
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
