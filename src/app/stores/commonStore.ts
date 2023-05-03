import { initializeApp } from "firebase/app";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import "firebase/analytics";
import "firebase/messaging";
import {
  getFirestore,
  doc,
  setDoc,
  collection,
 // getDocs,
 // onSnapshot,
  addDoc,
 // query,
 // where,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

//import { makeAutoObservable, reaction } from "mobx";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "voting-platform-926cc.firebaseapp.com",
  projectId: "voting-platform-926cc",
  storageBucket: "voting-platform-926cc.appspot.com",
  messagingSenderId: "203123926973",
  appId: "1:203123926973:web:9c3e136c4f206b36fad4d4"
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export const logout = () => {
  authentication.signOut();
};

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authentication, provider)
      .then(async (re) => {
            const collectionRef = collection(db, "users")
            const payload = {
              id: re.user.uid,
              name: re.user.displayName,
              email: re.user.email,
              image: re.user.photoURL
            }
            await addDoc(collectionRef, payload);
            const docRef = doc(db, "userChats", re.user.uid);
            await setDoc(docRef, {});
      })
      .catch((err) => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error);
  }
};


