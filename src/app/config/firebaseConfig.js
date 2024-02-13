import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCXYP0bmOQONa_HedUayJ-B8QtYd6zIUwA",
    authDomain: "bangkuoka.firebaseapp.com",
    projectId: "bangkuoka",
    storageBucket: "bangkuoka.appspot.com",
    messagingSenderId: "20214675716",
    appId: "1:20214675716:web:843f1f94871dbf1b82b851",
    measurementId: "G-3CT6WF66ZR"
};

let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

isSupported().then(res => {
    if (res) getAnalytics(firebaseApp)
})

export const db = getFirestore();
export const storage = getStorage();

export default firebaseApp;


