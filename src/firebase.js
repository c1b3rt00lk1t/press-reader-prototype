// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlDzlrEY-VkPZdNkEZOTSbrLJcL2LoQTo",
  authDomain: "press-uploader.firebaseapp.com",
  projectId: "press-uploader",
  storageBucket: "press-uploader.appspot.com",
  messagingSenderId: "496555378224",
  databaseURL:
    "https://press-uploader-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:496555378224:web:323bd87185f34dfe5c8ff5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Real-time database
const database = getDatabase(app);

export const getDataFromDB = (handleDataFromDB,setConnected,  setDataLS,dataLS) => {
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, (snap) => {
    if (snap.val() === true) {
      setConnected(true);
      console.log("connected");
      const refDB = ref(database, "/sessions/");
      onValue(refDB, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        setDataLS(data);
        handleDataFromDB(data);
      });
    } else {
      setConnected(false);
      handleDataFromDB(dataLS);
      console.log("not connected");
    }
  });
};
