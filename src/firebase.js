// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { firebaseConfig } from "./firebaseEnv.mjs";

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Real-time database
const database = getDatabase(app);
const connectedRef = ref(database, ".info/connected");

export const checkConnectionFromDB = (setConnected) => {
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      setConnected(true);
      console.log("connected");
    } else {
      setConnected(false);
      console.log("not connected");
    }
  });
};

const getDataFromDB = (path) => (handleDataFromDB) => {
  const refDB = ref(database, path);
  onValue(refDB, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      handleDataFromDB(data);
    } else {
      console.log(`There is no data in ${path}`);
    }
  });
};

export const getDataFromDBSessionList = getDataFromDB("/sys/sessions/");
export const getDataFromDBOneSession = (session) =>
  getDataFromDB("/sessions/" + session);
export const getDataFromDBDictionary = getDataFromDB("/dictionary/");
