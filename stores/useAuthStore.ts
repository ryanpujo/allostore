import { onAuthStateChanged, type User } from "firebase/auth";

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<User | null>(null);
  const isSignedIn = computed(() => user.value != null);
  const unsubscribe = onAuthStateChanged(useFirebaseAuth(), (currUser) => {
    user.value = currUser;    
  });
  return {
    user,
    unsubscribe,
    isSignedIn
  }
});