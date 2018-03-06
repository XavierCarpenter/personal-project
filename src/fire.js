import { default as fb } from "firebase";

const config = {
  apiKey: "AIzaSyD4iGLhKwbgmHAQi01m4IML8bXMsJzOL1E",
  authDomain: "personal-622af.firebaseapp.com",
  databaseURL: "https://personal-622af.firebaseio.com",
  projectId: "personal-622af",
  storageBucket: "personal-622af.appspot.com",
  messagingSenderId: "455357201879"
};

const firebase = fb.initializeApp(config);

export default firebase;
