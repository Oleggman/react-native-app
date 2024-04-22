import { collection, addDoc, getDocs, updateDoc, where, query } from "firebase/firestore";
import { db } from "../config";
import { storage } from "../config";
import { ref, uploadBytes } from "@firebase/storage";

export const writeDataToFirestore = async (post) => {
  try {
    const photoUrl = await uploadImageToFirebaseStorage(post.photoUri, `${post.postTitle}_${Date.now()}`);

    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
      photoUri: photoUrl,
    });

    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

export const getPostsByUserFromFireStore = async (userId) => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "posts"), where("owner", "==", userId)));
    const posts = [];
    querySnapshot.forEach((doc) => {
      posts.push({ id: doc.id, data: doc.data() });
    });

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDataInFirestore = async (collectionName, docId, updatedPost) => {
  try {
    const ref = doc(db, collectionName, docId);

    await updateDoc(ref, updatedPost);
    console.log("document updated");
  } catch (error) {
    console.log(error);
  }
};
//TODO: fix app crashing (possible place)
export const uploadImageToFirebaseStorage = async (uri, imageName) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const photoRef = ref(storage, `images/${imageName}`);
    await uploadBytes(photoRef, blob);
    return photoRef._location.path_;
  } catch (error) {
    console.error("Error uploading image to Firebase Storage:", error);
    throw error;
  }
};
