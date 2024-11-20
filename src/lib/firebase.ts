// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyA994langTIyKXUZ0LG6YMb7K8j9dSTL6E",
	authDomain: "svelte-melvin.firebaseapp.com",
	projectId: "svelte-melvin",
	storageBucket: "svelte-melvin.firebasestorage.app",
	messagingSenderId: "76784658428",
	appId: "1:76784658428:web:65279cb8a4aad232893479"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

function userStore() {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.warn("Auth is not initialized or not in browser");
		const { subscribe } = writable<User | null>(null);
		return { subscribe };
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return {
		subscribe
	};
}

export const user = userStore();
