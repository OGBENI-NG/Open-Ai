import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdzlXiMsS3PtKISqbfB1jL2_PoMgBiTIo",
  authDomain: "openaikey-29887.firebaseapp.com",
  projectId: "openaikey-29887",
  storageBucket: "openaikey-29887.appspot.com",
  messagingSenderId: "852399673010",
  appId: "1:852399673010:web:ee958f9e790b8d2d6543ab"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const fetchApiKey = async () => {
  try {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "textTranslator"));
    const documents = querySnapshot.docs.map(doc => doc.data());
    return documents;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
}

const fetchApiNewKey = async () => {
  try {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "newApiKey"));
    const documents = querySnapshot.docs.map(doc => doc.data());
    return documents;
  } catch (error) {
    console.error("Error fetching API keys:", error);
    throw error; // Re-throw the error to propagate it to the calling code
  }
};



export {fetchApiKey, fetchApiNewKey}
