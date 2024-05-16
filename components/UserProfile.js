import { StyleSheet, View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";
import { selectLogin } from "../redux/slices/authSlice";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import AddPhotoBox from "./AddPhotoBox";
import { getUserAvatar, writeAvatarToFirestore } from "../db";
import { ref, getDownloadURL } from "@firebase/storage";
import { storage } from "../config";

export const UserProfile = ({ uid, login, setAvatar }) => {
  const userLogin = useSelector(selectLogin);
  const [userPhoto, setUserPhoto] = useState(null);

  useEffect(() => {
    const getImageURL = async () => {
      try {
        const photoPath = await getUserAvatar(userLogin);
        if (!photoPath) return;
        const photoRef = ref(storage, photoPath);
        const url = await getDownloadURL(photoRef);
        setUserPhoto(url);
        setAvatar(url);
      } catch (error) {
        console.error("Error getting image URL:", error);
      }
    };

    getImageURL();
  }, []);

  const ImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        //FIXME: Error uploading avatar to Firebase Storage: [TypeError: Network request failed]
        // await writeAvatarToFirestore(result.assets[0].uri);
        setUserPhoto(result.assets[0].uri);
        setAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onCopyId = () => {
    Toast.show({
      type: "success",
      text1: "Name copied!",
      topOffset: 64,
      text1Style: { fontSize: 20, color: "green" },
      visibilityTime: 2000,
    });
    Clipboard.setStringAsync(userLogin ?? uid);
  };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={styles.profileContainer}>
        <View style={{ marginBottom: 20 }}>
          {userPhoto ? (
            <Pressable
              onPress={() => {
                ImagePick();
              }}>
              <Image style={styles.photo} source={{ uri: userPhoto }} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                ImagePick();
              }}>
              <AddPhotoBox />
            </Pressable>
          )}
        </View>
        <TouchableOpacity onPress={onCopyId} style={styles.copyToClipboardButton}>
          <Text style={[styles.profileId, { color: "#FFF" }]}>{userLogin ?? uid}</Text>
          <Ionicons name={"copy-outline"} size={28} color="#FFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    marginVertical: 24,
    paddingVertical: 24,
    paddingHorizontal: 36,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: "#263a43",
  },
  photo: {
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  profileId: {
    fontFamily: "Roboto400",
    fontSize: 28,
    color: "#FF6C00",
  },
  copyToClipboardButton: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    backgroundColor: "#FF6C00",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
});
