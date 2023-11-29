<script setup lang="ts">
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
const isLoading = ref(false);
const dialog = ref(false);
const email = ref('');
const password =ref('');
const auth = useFirebaseAuth();
const handleSignIn = async () => {
  isLoading.value = true;
  const user = await signInWithEmailAndPassword(auth, email.value, password.value);
  isLoading.value = false;
  dialog.value = false;
}
</script>

<template>
<VListItem density="compact" @click="dialog = true" prepend-icon="mdi-account" title="Sign in" subtitle="Account">
  </VListItem>
<VRow v-if="dialog" justify="center" dense>
  <VDialog
    v-model="dialog"
    width="480"
    persistent
  >
    <VCard v-if="isLoading">
      <VCardText class="d-flex justify-center">

        <VProgressCircular indeterminate color="primary" :size="72"></VProgressCircular>
      </VCardText>
    </VCard>
    <VCard v-else>
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
          <p>sdsd</p>
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