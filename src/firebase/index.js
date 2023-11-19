import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";
import { getFirestore } from "firebase/firestore";

const vapidKey = "BA1iHsBSQYrQOD8YOyOpw-o6DRGl8cqikIPahBu8zviX6-IvTJViClEQ8z9oZv2KeF1R4Fa5zns_hXw1Ju00Cr0"

const firebaseConfig = {
    apiKey: "AIzaSyBUyAwVmOj8UzF6sgowZqj8bpBVKr5pabE",
    authDomain: "fir-shoping-63976.firebaseapp.com",
    projectId: "fir-shoping-63976",
    storageBucket: "fir-shoping-63976.appspot.com",
    messagingSenderId: "170903853321",
    appId: "1:170903853321:web:1e046732acfc360cde1bd8",
    measurementId: "G-F0P2ZVWV16"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const messaging = getMessaging();

getToken(messaging, { vapidKey })
    .then((currentToken) => {
    if (currentToken) {
        if (localStorage.getItem('TokenSavedInDb')) return;
        localStorage.setItem('TokenSavedInDb', currentToken)
    } else {
        console.log('No registration token available. Request permission to generate one.');
    }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });

export const db = getFirestore();