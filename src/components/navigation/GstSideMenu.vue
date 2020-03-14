<template>
  <v-navigation-drawer app fixed permanent height="100vh">
    <template v-slot:prepend>
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-btn to="/account" icon>
            <img v-if="currentUser" :src="currentUser.photoURL" style="width: 40px;" />
            <v-icon v-else>mdi-account</v-icon>
          </v-btn>
        </v-list-item-avatar>

        <v-list-item-content v-if="currentUser">
          <v-list-item-title>{{ currentUser.displayName }}</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <v-list-item-title>No User</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item v-for="item in items" :key="item.title" :to="item.to">
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "GstSideMenu",

  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home", to: "/" },
        { title: "Account", icon: "mdi-account", to: "/account" },
        { title: "Post", icon: "mdi-send", to: "/post" }
      ]
    };
  },

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>