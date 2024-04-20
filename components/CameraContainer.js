import { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image, Pressable } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export const CameraContainer = ({ onTakeShot, onResetPost, resetPhoto, setResetPhoto }) => {
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

  useEffect(() => {
    if (resetPhoto) {
      setPhotoUri(null);
      setResetPhoto(false);
    }
  }, [resetPhoto]);

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
      <Text style={styles.photoTitle}>Зробіть знімок</Text>
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
      <Text style={styles.photoTitle}>Або виберіть з галереї</Text>
      <TouchableOpacity
        style={[styles.secondaryBtn, { paddingTop: 12, paddingBottom: 12 }]}
        onPress={() => {
          ImagePick();
        }}>
        <Text style={styles.choosePhotoText}>Вибрати з галереї</Text>
      </TouchableOpacity>
      <Pressable
        onPress={() => {
          setPhotoUri(null);
          onResetPost();
        }}
        style={styles.secondaryBtn}>
        <Ionicons name="trash-bin" size={24} color="#FF6C00" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    alignItems: "center",
  },
  camera: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  photo: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 16,
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
    borderRadius: 50,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FF6C00",
  },
  choosePhotoText: {
    color: "#FF6C00",
    fontFamily: "Roboto700",
    fontSize: 18,
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
  photoTitle: {
    color: "#828282",
    fontFamily: "Roboto400",
    fontSize: 20,
    marginBottom: 16,
  },
});
