<script setup>
import {nanoid } from 'nanoid';
const menu = ref(false);
const isOpen = ref(false);
const authStore = useAuthStore();
const {user, isSignedIn} = storeToRefs(authStore)
onUnmounted(() => {
  authStore.unsubscribe();
});
const navs = [
  {
    id: nanoid(4),
    title: 'Home',
    href: '/'
  },
  {
    id: nanoid(4),
    title: 'Catalog',
    href: '/catalog'
  },
  {
    id: nanoid(4),
    title: 'Customer Service',
    href: '/cs'
  },
  {
    id: nanoid(4),
    title: 'Policy',
    href: '/policy'
  },
];
const userNavs = [
  {
    id: nanoid(4),
    title: 'Profile',
    href: '/profile'
  },
  {
    id: nanoid(4),
    title: 'Account',
    href: '/account'
  },
  {
    id: nanoid(4),
    title: 'Settings',
    href: '/settings'
  },
];
const auth = useFirebaseAuth();
const handleSignOut = () => {
  auth.signOut();
}
</script>

<template>
<VAppBar color="primary" class="">
  <VAppBarNavIcon class="d-flex d-md-none" @click.stop="isOpen = !isOpen"></VAppBarNavIcon>
  <VAppBarTitle class="d-flex justify-center justify-md-start">allostore</VAppBarTitle>
  <VList class="d-none d-md-flex flex-md-grow-1" bg-color="primary">
    <VListItem v-for="nav in navs" :title="nav.title" :href="nav.href" :key="nav.id"></VListItem>
  </VList>

  <VMenu 
    v-model="menu"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{props}">
      <VBtn icon v-bind="props">
        
        <VAvatar>
          <VImg src="https://cdn.vuetifyjs.com/images/john.jpg" alt="alt"></VImg>
        </VAvatar>
      </VBtn>
    </template>
    <VCard min-width="300">
      <v-list nav>
        <div v-if="isSignedIn">
          <v-list-item
            prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
            :title="user.displayName"
            :subtitle="user.email"
          >
            <template v-slot:append>
              <v-btn
                variant="text"
                icon="mdi-heart"
              ></v-btn>
            </template>
          </v-list-item>
        </div>
        <div v-else>
          <VListItem><SignUpModal/></VListItem>
          <VListItem><SignInModal/></VListItem>
        </div>
      </v-list>

      <v-divider :thickness="6" color="info"></v-divider>
      <VList nav>
        <VListItem v-for="nav in userNavs" :title="nav.title" :href="nav.href" :key="nav.id"></VListItem>
      </VList>
      <v-divider :thickness="6" color="info"></v-divider>
      <VList nav v-if="isSignedIn">
        <VListItem title="Sign out" @click="handleSignOut"></VListItem>
      </VList>
    </VCard>
  </VMenu>
</VAppBar>
<VNavigationDrawer
  v-model="isOpen"
  temporary
>
  <VList nav>
    <VListItem v-for="nav in navs" :key="nav.id" :title="nav.title" :href="nav.href"></VListItem>
  </VList>
</VNavigationDrawer>
</template>