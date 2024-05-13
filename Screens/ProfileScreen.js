import { ScrollView, StyleSheet, View, Text } from "react-native";
import { PostItem } from "../components/PostItem";
import { useEffect, useState } from "react";
import { getPostsByUserFromFireStore } from "../db";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";
import { UserProfile } from "../components/UserProfile";
import Toast from "react-native-toast-message";

export const ProfileScreen = () => {
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
      text1: "Post was deleted!",
      topOffset: 64,
      text1Style: { fontSize: 20, color: "blue" },
      visibilityTime: 3000,
    });
    navigation.navigate("Profile");
    setPosts((posts) => posts.filter((post) => post.id !== id));
  };

  return (
    <ScrollView>
      <UserProfile uid={auth.currentUser.uid} />
      {posts && (
        <View>
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
            <View style={styles.container}>
              <Text style={styles.errorBadge}>You do not have any posts. Fix it now and create your first post!</Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  list: {
    flex: 1,
    gap: 40,
    justifyContent: "center",
    marginBottom: 48,
  },
  errorBadge: {
    width: "90%",
    marginTop: 28,
    backgroundColor: "#FFF0D8",
    borderColor: "#FF6C00",
    borderWidth: 3,
    borderRadius: 5,
    textAlign: "center",
    padding: 20,
    color: "#FF6C00",
    fontSize: 20,
    fontFamily: "Roboto700",
  },
});
