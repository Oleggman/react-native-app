import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { getLocation } from "../utils/getLocation";
import { MaterialIcons } from "@expo/vector-icons";
import { deletePost, pressLike } from "../db";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";

export const PostItem = ({ post, getAllPostsByUser, postId, onDeletePost, ownPost }) => {
  const [imageURL, setImageURL] = useState(null);
  const [location, setLocation] = useState(null);

  const navigation = useNavigation();

  useEffect(() => {
    const getImageURL = async () => {
      try {
        const photoRef = ref(storage, post.photoUri);
        const url = await getDownloadURL(photoRef);
        setImageURL(url);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    };

    const getAddress = async () => {
      const address = await getLocation(post.location);
      setLocation(address);
    };

    getImageURL();
    getAddress();
  }, [post]);

  const onLikePress = async () => {
    await pressLike(auth.currentUser.uid, post, postId);
    await getAllPostsByUser();
  };

  const Like = useMemo(() => {
    if (post.likes.includes(auth.currentUser.uid)) {
      return <Ionicons name="heart-sharp" size={24} color="#FF6C00" />;
    }
    return <Ionicons name="heart-outline" size={24} color="black" />;
  }, [post.likes]);

  const onLocationPress = () => {
    if (location) {
      navigation.navigate("Map", { location: post.location });
    }
  };

  return (
    <View style={styles.card}>
      <Pressable onPress={onLocationPress} style={[styles.description, { paddingTop: 12 }]}>
        <Ionicons name="location" size={20} color="#FF6C00" />
        <Text style={styles.descriptionText}>{location ? location : "Location"}</Text>
      </Pressable>
      <View>
        {imageURL ? (
          <Image style={styles.photo} source={{ uri: imageURL }} />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>

      <View style={styles.cardTitle}>
        <View style={styles.description}>
          <Pressable onPress={onLikePress} style={[styles.description, { marginBottom: 0 }]}>
            {Like}
            <Text style={styles.descriptionText}>
              {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
            </Text>
          </Pressable>
          {ownPost && (
            <Pressable
              onPress={() => {
                deletePost(postId, post.photoUri);
                onDeletePost(postId);
              }}>
              <MaterialIcons name="delete" size={28} color="#FF6C00" />
            </Pressable>
          )}
        </View>
        <View style={styles.description}>
          <Ionicons name="reader" size={20} color="#FF6C00" />
          <Text style={styles.descriptionText}>{post.postTitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
  },
  photo: {
    width: "100%",
    height: 340 + 340 * 0.14,
  },
  imagePlaceholder: {
    width: "100%",
    height: 340 + 340 * 0.14,
    marginBottom: 12,
    backgroundColor: "darkgray",
  },
  description: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 12,
    gap: 8,
    alignItems: "center",
  },
  cardTitle: {
    padding: 12,
  },
  descriptionText: {
    fontSize: 18,
    fontFamily: "Roboto400",
  },
});
