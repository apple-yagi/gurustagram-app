<template>
  <v-app-bar app color="grey lighten-4">
    <v-btn class="ma-2" to="/" text>
      <v-icon>mdi-silverware</v-icon>
      <span class="font-weight-thin">Gurustagram</span>
    </v-btn>

    <v-spacer />
    <v-btn to="/post" icon>
      <v-icon>mdi-send</v-icon>
      <span class="shrink ml-2 hidden-sm-and-down">Post</span>
    </v-btn>
    <v-btn to="/account" icon>
      <v-icon>mdi-account</v-icon>
      <span class="shrink ml-2 hidden-sm-and-down">Account</span>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header"
};
</script>
