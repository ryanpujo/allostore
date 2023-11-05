<script setup lang="ts">
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';

const dialog = ref(false);
const email = ref('');
const password =ref('');
const auth = useFirebaseAuth();
const handleSignIn = async () => {
  const user = await signInWithEmailAndPassword(auth, email.value, password.value);
  
  dialog.value = false;
}
</script>

<template>
<VRow justify="center">
  <VDialog
    v-model="dialog"
    width="480"
    persistent
  >
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        v-bind="props"
      >
          Sign in
      </v-btn>
    </template>
    <VCard>
      <VCardTitle primary-title>Sign in</VCardTitle>
      <VCardText>
        <vContainer>
          <VRow>
            <VCol cols="12">
              <VTextField
                placeholder="johndoe@gmail.com"
                prepend-inner-icon="mdi-email"
                v-model="email"
                label="Email"/>
            </VCol>
            <VCol cols="12">
              <VTextField
                prepend-inner-icon="mdi-lock"
                v-model="password"
                label="Password"
                type="password"/>
            </VCol>
          </VRow>
        </vContainer>
      </VCardText>
      <VCardActions>
        <VSpacer/>
        <VBtn variant="text" color="warning" @click="dialog = false">Close</VBtn>
        <VBtn variant="text" color="primary" @click="handleSignIn">Sign in</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</VRow>
</template>