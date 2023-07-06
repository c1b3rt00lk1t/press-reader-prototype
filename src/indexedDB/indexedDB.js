// using https://github.com/jakearchibald/idb
import { openDB } from 'idb';


const dbname = 'PressReader';
const version = 1;

// opens de database
const dbPromise = openDB(dbname, version, {
    upgrade(db) {
      db.createObjectStore('PrReSessionList');
    },
  });
  
// function to put/update and item in an object store (obj)
export async function set(obj, key, val) {
    return (await dbPromise).put(obj, val, key);
}

// function to get the item with key (key) from an object store (obj)
export async function get(obj,key) {
    return (await dbPromise).get(obj, key);
}

