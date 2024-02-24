import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

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

let db = getFirestore();
let storage = getStorage();
let auth = getAuth();

const initFirebase = () => {
    // isSupported().then(res => {
    //     console.log("Firebase Analytics Enabled!")
    //     console.log(res)
    //     if (res) 
    // })

    getAnalytics(firebaseApp)
    db = getFirestore(firebaseApp);
    storage = getStorage(firebaseApp);
    auth = getAuth(firebaseApp)
}

export { firebaseApp, initFirebase, db, storage, auth };


