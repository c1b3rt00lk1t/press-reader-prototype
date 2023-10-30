const firebaseConfig_DEV = {
  apiKey: "AIzaSyDUy1hFE-VOkWqOS0FmeNakeqp531kVdx0",
  authDomain: "press-uploader-2.firebaseapp.com",
  databaseURL:
    "https://press-uploader-2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "press-uploader-2",
  storageBucket: "press-uploader-2.appspot.com",
  messagingSenderId: "75363353539",
  appId: "1:75363353539:web:11077c15544e85eed47376",
};

const firebaseConfig_PRD = {
  apiKey: "AIzaSyDlDzlrEY-VkPZdNkEZOTSbrLJcL2LoQTo",
  authDomain: "press-uploader.firebaseapp.com",
  projectId: "press-uploader",
  storageBucket: "press-uploader.appspot.com",
  messagingSenderId: "496555378224",
  databaseURL:
    "https://press-uploader-default-rtdb.europe-west1.firebasedatabase.app/",
  appId: "1:496555378224:web:323bd87185f34dfe5c8ff5",
};

const isDevelopment = process.env.NODE_ENV === "development";

export const firebaseConfig = isDevelopment
  ? firebaseConfig_PRD
  : firebaseConfig_PRD;
