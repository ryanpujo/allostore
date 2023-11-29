<script setup lang="ts">
import { nanoid } from 'nanoid';

const value = ref(1);
const bottomNavs = [
{
    id: nanoid(4),
    title: 'Favourites',
    href: '/favourites',
    icon: 'mdi-heart'
  },
  {
    id: nanoid(4),
    title: 'Home',
    href: '/',
    icon: 'mdi-home'
  },
  {
    id: nanoid(4),
    title: 'Cart',
    href: '/cart',
    icon: 'mdi-cart'
  },
];
</script>

<template>
  <VBottomNavigation
    class="d-flex d-md-none"
    v-model="value"
    :elevation="15"
    color="primary"
    mode="shift"
    grow
    active
  >
    <VBtn v-for="nav in bottomNavs" :key="nav.id">
      <VIcon :icon="nav.icon"></VIcon>
      <span>{{ nav.title }}</span>
    </VBtn>
  </VBottomNavigation>
</template>