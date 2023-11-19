// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBUyAwVmOj8UzF6sgowZqj8bpBVKr5pabE",
    authDomain: "fir-shoping-63976.firebaseapp.com",
    projectId: "fir-shoping-63976",
    storageBucket: "fir-shoping-63976.appspot.com",
    messagingSenderId: "170903853321",
    appId: "1:170903853321:web:1e046732acfc360cde1bd8",
    measurementId: "G-F0P2ZVWV16"
});


if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../public/firebase-messaging-sw.js.js')
    .then((registration) => {
    console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
    console.error('Service Worker registration failed:', error);
    });
    }

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
};

self.registration.showNotification(notificationTitle,
    notificationOptions);
});