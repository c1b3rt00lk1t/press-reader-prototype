import { openDB } from 'idb';
// using https://github.com/jakearchibald/idb


const dbname = 'PressReader';
const version = 1;


export const dbPromise = openDB(dbname, version, {
    upgrade(db) {
      db.createObjectStore('PrReSessionList');
    },
  });
  

export async function set(obj, key, val) {
    return (await dbPromise).put(obj, val, key);
}

export async function get(obj,key) {
    return (await dbPromise).get(obj, key);
}

