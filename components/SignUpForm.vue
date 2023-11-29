<script setup lang="ts">
defineProps<{
  username: string;
  email: string;
  password: string;
}>();
const emits = defineEmits(['update:email', 'update:password', 'update:username'])
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VTextField
        :value="username"
        @input="emits('update:username', $event.target.value)"
        prepend-inner-icon="mdi-account"
        label="Username" required/>
    </VCol>
    <VCol cols="12">
      <VTextField
        :value="email"
        @input="emits('update:email', $event.target.value)"
        placeholder="johndoe@gmail.com"
        prepend-inner-icon="mdi-email"
        label="Email"/>
    </VCol>
    <VCol cols="12">
      <VTextField
        :value="password"
        @input="emits('update:password', $event.target.value)"
        prepend-inner-icon="mdi-lock"
        label="Password"
        type="password"/>
    </VCol>
  </VRow>
</template>