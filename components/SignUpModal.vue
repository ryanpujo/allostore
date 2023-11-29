<script setup lang="ts">
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const isLoading = ref(false);
const dialog = ref(false);
const username = ref('');
const email = ref('');
const password =ref('');
const auth = useFirebaseAuth();
const handleSignUp = async () => {
  isLoading.value = true;
  const cred = await createUserWithEmailAndPassword(auth, email.value, password.value);
  await updateProfile(cred.user, {displayName: username.value});
  isLoading.value = false;
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
        v-bind="props"
        variant="text"
      >
          Sign Up
      </v-btn>
    </template>
    <VCard v-if="isLoading">
      <VCardText class="d-flex justify-center">

        <VProgressCircular indeterminate color="primary" :size="72"></VProgressCircular>
      </VCardText>
    </VCard>
    <VCard v-else>
      <VCardTitle primary-title>Sign up</VCardTitle>
      <VCardText>
        <vContainer>
          <VRow>
            <VCol cols="12">
              <VTextField
                prepend-inner-icon="mdi-account"
                v-model="username"
                label="Username" required/>
            </VCol>
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
        <VBtn variant="text" color="primary" @click="handleSignUp">Sign up</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</VRow>
</template>