<script setup lang="ts">
import {nanoid } from 'nanoid';
import { useDisplay } from 'vuetify/lib/framework.mjs';
const isOpen = ref(false);
const authStore = useAuthStore();
const { isSignedIn} = storeToRefs(authStore)
onUnmounted(() => {
  authStore.unsubscribe();
});
const navsLeft = [
  {
    id: nanoid(4),
    title: 'Home',
    href: '/',
    icon: 'mdi-home'
  },
  {
    id: nanoid(4),
    title: 'Catalog',
    href: '/catalog',
    icon: 'mdi-basket'
  },
  {
    id: nanoid(4),
    title: 'Customer Service',
    href: '/cs',
    icon: 'mdi-help-box'
  },
  {
    id: nanoid(4),
    title: 'Policy',
    href: '/policy',
    icon: 'mdi-help-circle'
  },
  {
    id: nanoid(4),
    title: 'Blog',
    href: '/blog',
    icon: 'mdi-post'
  },
];
const navsRight = [
  {
    id: nanoid(4),
    title: 'Deals Of The Day',
    href: '/dealoftheday'
  },
  {
    id: nanoid(4),
    title: 'Hot Deals',
    href: '/hotdeals'
  },
  {
    id: nanoid(4),
    title: 'Best Sellers',
    href: '/bestsellers'
  },
  {
    id: nanoid(4),
    title: 'New Arrivals',
    href: '/newarrivals'
  },
];

const {mdAndUp, mobile, smAndDown} = useDisplay();
const searchKeyword = ref("");
const categories = ['cloth', 'Gadget', 'Laptop']
const value = ref('All Categories');
</script>

<template>
<VAppBar color="primary" class="" height="75">

    <!-- <VAppBarTitle class="d-flex d-md-none justify-center">
      <v-img
        width="80"
        height="80"
        aspect-ratio="3/2"
        contain
        src="/logo.png"
      ></v-img>
    </VAppBarTitle>
    <div class="mr-20 d-none d-md-flex">

      <v-img
        width="80"
        height="80"
        aspect-ratio="3/2"
        contain
        src="/logo.png"
      ></v-img>
    </div> -->
    <template v-slot:prepend>
      <VAppBarNavIcon class="d-flex d-md-none" @click.stop="isOpen = !isOpen"></VAppBarNavIcon>

      <VAppBarTitle class="d-none d-md-flex mr-16">
        <v-img
          width="80"
          height="80"
          aspect-ratio="3/2"
          contain
          src="/logo.png"
        ></v-img>
      </VAppBarTitle>
    </template>

    <template v-slot:title v-if="smAndDown">
      <VAppBarTitle class="d-flex d-md-none justify-center">
        <v-img
          width="80"
          height="80"
          aspect-ratio="3/2"
          contain
          src="/logo.png"
        ></v-img>
      </VAppBarTitle>
    </template>
  
  <VCard density="compact" height="52" class="d-none d-md-flex rounded-md flex-grow-1 mx-10">
    <div class="w-24">

      <VCombobox
        density="comfortable"
        :items="categories"
        v-model="value"
        variant="solo"
        rounded="0"
      ></VCombobox>
    </div>
    

      <VTextField
        
        density="comfortable"
        append-inner-icon="mdi-magnify"
        variant="solo"
        rounded="0"
        v-model="searchKeyword"
        label="Search Products"/>
  </VCard>


  <!-- extension slot -->
  <template v-slot:extension v-if="mdAndUp">
    <VList class="d-none d-md-flex flex-md-grow-1" bg-color="primary" nav>
      <VListItem>
        <VBtn size="small" variant="text" density="compact" class="d-none d-md-flex">
          <VIcon icon="mdi-blur"></VIcon>
          Browse Categories
        </VBtn>
      </VListItem>
      <VListItem v-for="nav in navsLeft" :title="nav.title" :href="nav.href" :key="nav.id"></VListItem>
    </VList>

    <VList class="d-none d-md-flex" bg-color="primary" nav>
      <VListItem v-for="nav in navsRight" :title="nav.title" :href="nav.href" :key="nav.id"></VListItem>
    </VList>
  </template>
  <!-- extension slot -->
  
  <template v-slot:append>
    <VList nav bg-color="primary" class="d-none d-md-flex ml-10">
      <VListItem density="compact" prepend-icon="mdi-heart" title="Wishlist" subtitle="My Items"></VListItem>
      <VBadge left color="info" :content="10">
        <VListItem density="compact" prepend-icon="mdi-cart" title="Price" subtitle="Total"></VListItem>
      </VBadge>
      <AuthModal v-if="!isSignedIn" />
      <AvatarMenu v-else/>
    </VList>
    <VList nav bg-color="primary" class="d-flex d-md-none">
      <AuthModal v-if="!isSignedIn" />
      <AvatarMenu v-else/>
    </VList>
  </template>
</VAppBar>
<VNavigationDrawer
  class="d-flex d-md-none"
  v-model="isOpen"
  temporary
>
  <VList nav>
    <VListItem v-for="nav in navsLeft" :key="nav.id" :title="nav.title" :href="nav.href" :prepend-icon="nav.icon"></VListItem>
  </VList>
  <VDivider />
  <VList nav>
    <VListItem v-for="nav in navsRight" :key="nav.id" :title="nav.title" :href="nav.href"></VListItem>
  </VList>
</VNavigationDrawer>
</template>