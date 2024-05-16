import { View, Text, StyleSheet, Image, Pressable, Platform } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../config";
import { Ionicons } from "@expo/vector-icons";
import { getLocation } from "../utils/getLocation";
import { MaterialIcons } from "@expo/vector-icons";
import { deletePost, pressLike } from "../db";
import { auth } from "../config";
import { useNavigation } from "@react-navigation/native";

export const PostItem = ({ post, getAllPostsByUser, postId, onDeletePost, ownPost, avatar, login }) => {
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
      return <Ionicons name="heart-sharp" size={24} color="#FFF" />;
    }
    return <Ionicons name="heart-outline" size={24} color="#FFF" />;
  }, [post.likes]);

  const onLocationPress = () => {
    if (location && Platform.OS !== "android") {
      navigation.navigate("Map", { location: post.location });
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ paddingTop: 12, paddingLeft: 8, flexDirection: "row", alignItems: "center", gap: 12 }}>
        {avatar ? (
          <Image style={styles.avatarPhoto} source={{ uri: avatar }} />
        ) : (
          <View style={styles.avatarPlaceholder} />
        )}
        <Text style={[styles.descriptionText, { fontSize: 14 }]}>{login}</Text>
      </View>
      <Pressable onPress={onLocationPress} style={[styles.description, { paddingTop: 12, paddingLeft: 12 }]}>
        <Ionicons name="location" size={20} color="#FFF" />
        <Text style={[styles.descriptionText, { fontSize: 14 }]}>{location ? location : "Location"}</Text>
      </Pressable>
      <View>
        {imageURL ? (
          <Image style={styles.photo} source={{ uri: imageURL }} />
        ) : (
          <View style={styles.avatarPlaceholder} />
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
              <MaterialIcons name="delete" size={28} color="#FFF" />
            </Pressable>
          )}
        </View>
        <View style={styles.description}>
          <Ionicons name="reader" size={20} color="#FFF" />
          <Text style={styles.descriptionText}>{post.postTitle}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    backgroundColor: "#263a43",
  },
  photo: {
    width: "100%",
    height: 340 + 340 * 0.14,
  },
  avatarPhoto: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  avatarPlaceholder: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "gray",
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
    color: "#FFF",
  },
  descriptionText: {
    fontSize: 18,
    color: "#FFF",
    fontFamily: "Roboto400",
  },
});
