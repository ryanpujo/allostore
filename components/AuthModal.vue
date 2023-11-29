<script setup lang="ts">
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@firebase/auth';
const email = ref("");
const password = ref("");
const username = ref("");
const signUp = ref(false);
const isLoading = ref(false);
const dialog = ref(false);
const errMessage = ref('');
const auth = useFirebaseAuth();
const handleSignIn = async () => {
  isLoading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    dialog.value = false;
  } catch (error) {
    errMessage.value = useFirebaseError(error).message.value;
  }
  isLoading.value = false;
}
const handleSignUp = async () => {
  isLoading.value = true;
  try {
    const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
    await updateProfile(cred.user, {displayName: username.value});
    dialog.value = false;
  } catch (error) {
    errMessage.value = useFirebaseError(error).message.value;
  }
  isLoading.value = false;
}

</script>

<template>
  <VListItem density="compact" @click="dialog = true" prepend-icon="mdi-account" title="Sign in" subtitle="Account">
  </VListItem>
  <VDialog
    v-model="dialog"
    width="480"
    persistent
  >
    <VCard>
      <VAlert v-if="errMessage" type="error" :text="errMessage">
        
      </VAlert>
      <VCardTitle primary-title>{{ signUp ? 'Sign Up' : 'Sign In' }}</VCardTitle>
      <VCardText>
        <div v-if="isLoading" class="d-flex justify-center">
          <VProgressCircular indeterminate color="primary" :size="72"></VProgressCircular>
        </div>
        <vContainer v-else>
          <SignUpForm v-if="signUp" v-model:email="email" v-model:password="password" v-model:username="username" />
          <SignInForm v-else v-model:email="email" v-model:password="password" />
          <p v-if="signUp">Already have an account? <span @click="() => {
            signUp = false;
            errMessage = '';
          }" class="text-blue-500 cursor-pointer">Sign in</span></p>
          <p v-else>Don't have an account? <span @click="() => {
            signUp = true;
            errMessage = '';
          }" class="text-blue-500 cursor-pointer">Sign up</span></p>
        </vContainer>
      </VCardText>
      <VCardActions>
        <VSpacer/>
        <VBtn variant="text" color="warning" @click="dialog = false">Close</VBtn>
        <VBtn v-if="signUp" :disabled="!username || !email || !password" variant="text" color="primary" @click="handleSignUp">Sign up</VBtn>
        <VBtn v-else :disabled="!email || !password" variant="text" color="primary" @click="handleSignIn">Sign in</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>