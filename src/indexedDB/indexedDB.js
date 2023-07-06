// import { openDB, deleteDB, wrap, unwrap } from 'idb';

// let db;
// const dbname = 'PressReader';
// const version = 1;

// export async function init() {
//   db = await openDB(dbname, version, db => {
//       db.createObjectStore('PrReSessionList', {keyPath: 'sessions'});
//   })
// };

// async function addSessionList() {
  
// }


// async function getSessionlist (){
//     let tx = db.transaction('getSessionList');
//     let sessionListStore = tx.objectStore('PrReSessionList');

//     let sessionList = await sessionListStore.getAll();

//     if (sessionList.length){
//       console.log(`The sessions are the following: ${sessionList}`)
//     }
// };
