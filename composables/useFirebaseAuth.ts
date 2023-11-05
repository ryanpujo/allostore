import { getAuth, type Auth } from "firebase/auth";

export default function useFirebaseAuth(): Auth {
  const app = useFirebaseApp();
  const auth = getAuth(app);
  return auth;
}