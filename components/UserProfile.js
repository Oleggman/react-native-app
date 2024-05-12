import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";

export const UserProfile = ({ uid }) => {
  const onCopyId = () => {
    Toast.show({
      type: "success",
      text1: "ID скопійовано!",
      topOffset: 64,
      text1Style: { fontSize: 20, color: "green" },
      visibilityTime: 2000,
    });
    Clipboard.setStringAsync(uid);
  };

  return (
    <View style={styles.profileContainer}>
      <Text style={styles.profileIdText}>Ваш ID:</Text>
      <TouchableOpacity onPress={onCopyId} style={styles.copyToClipboardButton}>
        <Text style={[styles.profileId, { color: "#FFF" }]}>{uid}</Text>
        <Ionicons name={"copy-outline"} size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    paddingVertical: 32,
    paddingHorizontal: 20,
    alignItems: "center",
    borderBottomWidth: 5,
    borderBottomColor: "#FFF",
  },
  profileIdText: {
    fontFamily: "Roboto700",
    fontSize: 24,
    marginBottom: 12,
  },
  profileId: {
    fontFamily: "Roboto400",
    fontSize: 16,
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
