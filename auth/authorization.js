import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config";
import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../config";

export const registerDB = async ({ email, password, login }) => {
  const querySnapshot = await getDocs(query(collection(db, "users"), where("login", "==", login)));

  if (!querySnapshot.empty) {
    return false;
  }

  return createUserWithEmailAndPassword(auth, email, password);
};

export const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

export const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

export const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};
