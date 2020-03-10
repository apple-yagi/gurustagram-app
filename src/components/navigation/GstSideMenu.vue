<template>
  <v-navigation-drawer app fixed permanent height="100vh">
    <template v-slot:prepend>
      <v-list-item two-line class="px-2">
        <v-list-item-avatar>
          <v-icon>mdi-account</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Jane Smith</v-list-item-title>
          <v-list-item-subtitle>Logged In</v-list-item-subtitle>
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
  }
};
</script>