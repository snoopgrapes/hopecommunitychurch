// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlraUCERxYy9b1vN4FRtimdltQWNfEXww",
  authDomain: "hopeforrecovery-8afc7.firebaseapp.com",
  projectId: "hopeforrecovery-8afc7",
  storageBucket: "hopeforrecovery-8afc7.firebasestorage.app",
  messagingSenderId: "272983348501",
  appId: "1:272983348501:web:0bba174aed5ec827ba051c",
  measurementId: "G-BJB0E4LXSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Function to save user progress
export async function saveProgress(userId, progress) {
  try {
    const userDocRef = doc(db, "users", userId);
    await setDoc(userDocRef, { progress: progress }, { merge: true });
    console.log("Progress saved successfully!");
  } catch (e) {
    console.error("Error saving progress: ", e);
  }
}

// Function to load user progress
export async function loadProgress(userId) {
  try {
    const userDocRef = doc(db, "users", userId);
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      console.log("Progress loaded successfully!");
      return docSnap.data().progress;
    } else {
      console.log("No progress found for this user.");
      return null;
    }
  } catch (e) {
    console.error("Error loading progress: ", e);
    return null;
  }
}