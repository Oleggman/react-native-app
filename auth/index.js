import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./config";

const registerDB = ({ email, password }) => createUserWithEmailAndPassword(auth, email, password);

const authStateChanged = async (onChange = () => {}) => {
  onAuthStateChanged((user) => {
    onChange(user);
  });
};

const loginDB = async ({ email, password }) => {
  try {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials.user;
  } catch (error) {
    throw error;
  }
};

const updateUserProfile = async (update) => {
  const user = auth.currentUser;

  if (user) {
    try {
      await updateProfile(user, update);
    } catch (error) {
      throw error;
    }
  }
};

export default { registerDB, authStateChanged, loginDB, updateUserProfile };
