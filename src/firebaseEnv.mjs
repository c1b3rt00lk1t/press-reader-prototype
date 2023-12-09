const firebaseConfig_DEV = {
  apiKey: "AIzaSyA_-oNiXKfLQ3xojZ2uIVKzB30Y28M95jY",
  authDomain: "press-uploader-2348f.firebaseapp.com",
  databaseURL:
    "https://press-uploader-2348f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "press-uploader-2348f",
  storageBucket: "press-uploader-2348f.appspot.com",
  messagingSenderId: "687171451792",
  appId: "1:687171451792:web:f844e327108222c8389115",
};

const firebaseConfig_PRD = {
  apiKey: "AIzaSyA_-oNiXKfLQ3xojZ2uIVKzB30Y28M95jY",
  authDomain: "press-uploader-2348f.firebaseapp.com",
  databaseURL:
    "https://press-uploader-2348f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "press-uploader-2348f",
  storageBucket: "press-uploader-2348f.appspot.com",
  messagingSenderId: "687171451792",
  appId: "1:687171451792:web:f844e327108222c8389115",
};

const isDevelopment = process.env.NODE_ENV === "development";

export const firebaseConfig = isDevelopment
  ? firebaseConfig_PRD
  : firebaseConfig_DEV;
