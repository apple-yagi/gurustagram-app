<template>
  <v-footer app>
    <v-layout justify-space-between style="width: 50%">
      <v-btn v-for="(item, index) in items" :key="index" :to="item.to" icon>
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: "GstFooter",

  data() {
    return {
      items: [
        { icon: "mdi-home", to: "/" },
        { icon: "mdi-send", to: "/post" },
        { icon: "mdi-account", to: "/account" },
        { icon: "mdi-search", to: "/search" }
      ]
    };
  }
};
</script>
