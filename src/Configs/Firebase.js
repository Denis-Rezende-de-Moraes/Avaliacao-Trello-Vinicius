import * as firebase from 'firebase';
import 'firebase/firestore';

var firebaseConfigs = {
    apiKey: "AIzaSyBlDRG0mfCg4ynSjZ2bdETid-8EIp3QxE8",
    authDomain: "prova-c36da.firebaseapp.com",
    databaseURL: "https://prova-c36da.firebaseio.com",
    projectId: "prova-c36da",
    storageBucket: "prova-c36da.appspot.com",
    messagingSenderId: "1095774557497",
    appId: "1:1095774557497:web:c74872198d2957330e04e8",
    measurementId: "G-BJSCFT8XP9"
};

firebase.initializeApp(firebaseConfigs);

export const database = firebase.firestore();