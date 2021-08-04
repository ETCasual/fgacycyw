/* eslint-disable @typescript-eslint/no-explicit-any */
import firebase from 'firebase/app'
import 'firebase/auth'

// Client API Keys and Config taken from Firebase Console
const CLIENT_CONFIG = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: 'fgacycyw-web.appspot.com',
	messagingSenderId: '1043771250555',
	appId: '1:1043771250555:web:8591e12f5035cd8d00cfde',
	measurementId: 'G-4HD88K0LF1'
}

// If the window is ready and no apps is registered to the client
if (typeof window !== 'undefined' && !firebase.apps.length) {
	// Initalize an app with provided config
	firebase.initializeApp(CLIENT_CONFIG)
	// persist auth into browser's session
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
	// HACK: Typescript hack for the browser window
	;(window as any).firebase = firebase
}

export { firebase }
