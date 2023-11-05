import { initializeApp, type FirebaseApp, getApps, getApp } from "firebase/app";

let firebaseApp: FirebaseApp;
export default function useFirebaseApp(): FirebaseApp {
  if (getApps().length === 0) {
    firebaseApp = initializeApp({
      projectId: 'praim-store',
      apiKey: 'AIzaSyB0CAfP31ggFKk9EAx9pv5ylm4hDTOXylU',
      appId: '1:335562986072:android:261c166f279a345284f02d',
      authDomain: 'praim-store.firebaseapp.com'
    });
  } else {
    firebaseApp = getApp();
  }
  return firebaseApp;
}