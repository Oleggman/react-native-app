import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Camera, requestCameraPermissionsAsync } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export const CameraContainer = ({ onTakeShot, onResetPost, photoUri, setPhotoUri }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      await MediaLibrary.requestPermissionsAsync();

      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const ImagePick = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        onTakeShot();
        setPhotoUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.cameraContainer}>
      {photoUri ? (
        <Image style={styles.photo} source={{ uri: photoUri }} />
      ) : (
        <Camera style={styles.camera} type="back" ref={setCameraRef} photo={true}>
          <View style={styles.photoView}>
            <TouchableOpacity
              onPress={async () => {
                onTakeShot();
                if (cameraRef) {
                  const { uri } = await cameraRef.takePictureAsync();
                  await MediaLibrary.createAssetAsync(uri);
                  setPhotoUri(uri);
                }
              }}>
              <View style={styles.takePhotoOut}>
                <Ionicons name="camera" size={24} color="#f0f0f0" />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.secondaryBtn, { paddingTop: 12, paddingBottom: 12 }]}
          onPress={() => {
            ImagePick();
          }}>
          <View style={styles.actionButton}>
            <Text style={styles.choosePhotoText}>Choose photo</Text>
            <MaterialIcons name="photo-library" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
        <Pressable
          onPress={() => {
            setPhotoUri(null);
            onResetPost();
          }}
          style={styles.secondaryBtn}>
          <View style={styles.actionButton}>
            <Text style={styles.choosePhotoText}>Reset post</Text>
            <Ionicons name="trash-bin" size={24} color="#fff" />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    paddingTop: 16,
    alignItems: "center",
  },
  camera: {
    width: 343,
    height: 340,
    borderRadius: 8,
    marginBottom: 20,
  },
  photo: {
    width: 343,
    height: 340,
    borderRadius: 8,
    marginBottom: 16,
  },
  secondaryBtn: {
    backgroundColor: "#263a43",
    width: 168,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 50,
    marginBottom: 16,
    justifyContent: "center",
  },
  choosePhotoText: {
    color: "#fff",
    fontFamily: "Roboto700",
    fontSize: 18,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  photoView: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  takePhotoOut: {
    borderWidth: 2,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "rgba(255, 255, 255, 0.30)",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
