import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  where,
  query,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { db } from "../config";
import { storage } from "../config";
import { ref, uploadBytes, deleteObject } from "@firebase/storage";

export const writeDataToFirestore = async (post) => {
  try {
    const photoUrl = await uploadImageToFirebaseStorage(post.photoUri, `${post.postTitle}_${Date.now()}`);

    const docRef = await addDoc(collection(db, "posts"), {
      ...post,
      photoUri: photoUrl,
      createdAt: serverTimestamp(),
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
//FIXME: fix app crashing (possible place)
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

export const deletePost = async (docId, photoUri) => {
  try {
    await deleteDoc(doc(db, "posts", docId));
    await deleteObject(ref(storage, photoUri));
  } catch (error) {
    console.error("Помилка під час видалення документа та файлу зображення:", error);
  }
};

export const pressLike = async (uid, post, postId) => {
  const ref = doc(db, "posts", postId);
  try {
    if (!post.likes.some((like) => like === uid)) {
      await updateDoc(ref, {
        ...post,
        likes: [...post.likes, uid],
      });
    } else {
      await updateDoc(ref, {
        ...post,
        likes: post.likes.filter((like) => like !== uid),
      });
    }
  } catch (error) {
    console.error("Помилка під час лайка:", error);
  }
};
