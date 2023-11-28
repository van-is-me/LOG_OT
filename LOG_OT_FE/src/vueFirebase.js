import Vue from 'vue'
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(firestorePlugin)

const firebaseConfig = {
    apiKey: "AIzaSyBF9eFM4CScZa1N5dyCUcF5YfsD3mnaGJ0",
  authDomain: "logot-4c426.firebaseapp.com",
  projectId: "logot-4c426",
  storageBucket: "logot-4c426.appspot.com",
  messagingSenderId: "67559878022",
  appId: "1:67559878022:web:055852f237a037d611d007",
  measurementId: "G-0318L4XFJR"
}

firebase.initializeApp(config)

export const db = firebase.firestore()