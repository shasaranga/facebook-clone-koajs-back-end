const { getStorage } = require('firebase-admin/storage');

const { initializeApp, cert } = require('firebase-admin/app');


const serviceAccount = require("../firebase-admin-fb-clone.json");

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const storage = getStorage();

module.exports = {
  storage
}
