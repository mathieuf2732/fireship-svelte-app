// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyA994langTIyKXUZ0LG6YMb7K8j9dSTL6E',
	authDomain: 'svelte-melvin.firebaseapp.com',
	projectId: 'svelte-melvin',
	storageBucket: 'svelte-melvin.firebasestorage.app',
	messagingSenderId: '76784658428',
	appId: '1:76784658428:web:65279cb8a4aad232893479'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
