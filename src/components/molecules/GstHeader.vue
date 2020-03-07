<template>
  <v-app-bar app color="secondary" dark>
    <v-btn to="/">
      <v-icon>zmdi zmdi-cutlery</v-icon>
      <span class="shrink ml-2 hidden-sm-and-down">Gurustagram</span>
    </v-btn>

    <v-spacer />
    <v-btn class="mr-2" to="/post">
      <v-icon>mdi-send</v-icon>
      <span class="shrink ml-2 hidden-sm-and-down">Post</span>
    </v-btn>
    <v-btn to="/account">
      <v-icon>zmdi zmdi-account-circle</v-icon>
      <span class="shrink ml-2 hidden-sm-and-down">Account</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>
