import { FirebaseError } from "firebase/app";

export const useFirebaseError = (error: unknown) => {
  const message = ref('');
  const isFirebaseError = computed(() => error instanceof FirebaseError);
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case 'auth/invalid-login-credentials':
        message.value = 'credential is invalid';
        break;
      case 'auth/invalid-email':
        message.value = 'please enter a valid email';
        break;
      case 'auth/email-already-in-use':
        message.value = 'email already exist';
        break;
      default:
        message.value = 'unknown error';
        break;
    }
  }

  return {
    message,
    isFirebaseError
  };
}