<script setup  lang="ts">
import { nanoid } from 'nanoid';
const menu = ref(false);
const authStore = useAuthStore();
const {user, isSignedIn} = storeToRefs(authStore);
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
  <VMenu 
      v-model="menu"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{props}">
        <VListItem v-bind="props" prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg" :title="user?.displayName!" >
          <VListItemSubtitle>{{ user?.email }}</VListItemSubtitle>
        </VListItem>
      </template>
      <VCard min-width="300">
        <v-list nav>
          <div v-if="isSignedIn">
            <v-list-item
              prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
              :title="user!.displayName!"
              :subtitle="user!.email!"
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
        <VList nav v-if="isSignedIn">
          <VListItem v-for="nav in userNavs" :title="nav.title" :href="nav.href" :key="nav.id"></VListItem>
        </VList>
        <v-divider :thickness="6" color="info"></v-divider>
        <VList nav v-if="isSignedIn">
          <VListItem title="Sign out" @click="handleSignOut"></VListItem>
        </VList>
      </VCard>
    </VMenu>
</template>