import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDidCb2rnxIcRLzZ0wiOIiGPC96NUbOQ90",
  authDomain: "reactrealtimechat.firebaseapp.com",
  databaseURL: "https://reactrealtimechat-default-rtdb.firebaseio.com",
  projectId: "reactrealtimechat",
  storageBucket: "reactrealtimechat.appspot.com",
  messagingSenderId: "174959870392",
  appId: "1:174959870392:web:52840d114b235c0b7fcf4d"
};

export const app = initializeApp(firebaseConfig);
