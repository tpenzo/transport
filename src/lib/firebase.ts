import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyBqZZzO16p7DoXFIpLvqOYJ8xuVuHU2cGE',
    authDomain: 'transport-3344a.firebaseapp.com',
    projectId: 'transport-3344a',
    storageBucket: 'transport-3344a.appspot.com',
    messagingSenderId: '548305190352',
    appId: '1:548305190352:web:9805536bdbf5049eaf8dd5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
