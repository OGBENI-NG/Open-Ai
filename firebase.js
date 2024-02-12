import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdzlXiMsS3PtKISqbfB1jL2_PoMgBiTIo",
  authDomain: "openaikey-29887.firebaseapp.com",
  projectId: "openaikey-29887",
  storageBucket: "openaikey-29887.appspot.com",
  messagingSenderId: "852399673010",
  appId: "1:852399673010:web:ee958f9e790b8d2d6543ab"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Function to fetch API key from Firebase
const fetchApiKey = async () => {
  try {
    // Get Firestore instance
    const db = getFirestore(app)
    // Query the 'textTranslator' collection
    const querySnapshot = await getDocs(collection(db, "textTranslator"))
    // Map documents to data and return
    const documents = querySnapshot.docs.map(doc => doc.data())
    return documents
  } catch (error) {
    console.error("Error fetching API key:", error)
    throw error // Re-throw the error to propagate it to the calling code
  }
}

// Function to fetch new API key from Firebase
const fetchApiNewKey = async () => {
  try {
    // Get Firestore instance
    const db = getFirestore(app)
    // Query the 'newApiKey' collection
    const querySnapshot = await getDocs(collection(db, "newApiKey"))
    // Map documents to data and return
    const documents = querySnapshot.docs.map(doc => doc.data())
    return documents
  } catch (error) {
    console.error("Error fetching new API key:", error)
    throw error // Re-throw the error to propagate it to the calling code
  }
}



export {fetchApiKey, fetchApiNewKey}
