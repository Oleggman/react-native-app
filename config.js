// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjakwM8LSygifE6fgkbGP5raMzBzNp0X4",
  authDomain: "postsapp-163d1.firebaseapp.com",
  projectId: "postsapp-163d1",
  storageBucket: "postsapp-163d1.appspot.com",
  messagingSenderId: "772513678169",
  appId: "1:772513678169:web:a4e5a7c2fd543df9728248",
  measurementId: "G-NGP5DNMTDE",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
