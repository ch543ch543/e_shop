import firebase from 'firebase';
import 'firebase/storage';
require("firebase/firestore");


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDcNL_NKslNrxggDFeS98cEngNz4BKuOsI",
    authDomain: "vue-shop-19fa3.firebaseapp.com",
    databaseURL: "https://vue-shop-19fa3.firebaseio.com",
    projectId: "vue-shop-19fa3",
    storageBucket: "vue-shop-19fa3.appspot.com",
    messagingSenderId: "234432297202",
    appId: "1:234432297202:web:07f72bdf86d04f8ddb786b",
    measurementId: "G-43S50WF5KX"
};
  // Initialize Firebase
  
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export {fb,db}

  