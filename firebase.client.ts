import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getDatabase, Database } from "firebase/database";
import { firebaseConfig } from "./firebase.config";
import { getFirestore } from "firebase/firestore";

let firebaseApp: FirebaseApp;
// let firebaseDatabase: Database;

if (!getApps().length) {
    firebaseApp = initializeApp(firebaseConfig);
} else {
    firebaseApp = getApps()[0];
}

const db = getFirestore(firebaseApp);

// firebaseDatabase = getDatabase(firebaseApp);

export { firebaseApp, db };