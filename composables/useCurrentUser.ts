import type { User } from "firebase/auth";

export default function useCurrentUser(): User | null {
  const auth = useFirebaseAuth();
  return auth.currentUser;
}