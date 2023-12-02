import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

export const CameraContainer = ({ onTakeShot, onResetPost }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
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
      <Text style={styles.description}>Редагувати фото</Text>

      <Pressable
        onPress={() => {
          setPhotoUri(null);
          onResetPost();
        }}
        style={styles.deleteBtn}>
        <Ionicons name="trash-bin" size={24} color="#FF6C00" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: "center",
  },
  description: {
    color: "#BDBDBD",
    fontFamily: "Roboto400",
    fontSize: 16,
    alignSelf: "flex-start",
  },
  camera: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  deleteBtn: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 50,
    marginBottom: 32,
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
});
