<template>
  <v-app-bar app color="grey lighten-4">
    <v-btn class="ma-2" to="/" text>
      <v-icon>mdi-silverware</v-icon>
      <span class="font-weight-thin">Gurustagram</span>
    </v-btn>

    <v-spacer />
    <v-btn to="/mypage" icon>
      <img
        v-if="currentUser"
        :src="currentUser.photoURL"
        alt="userImage"
        width="30"
        height="30"
        style="border-radius: 50%;"
      />
      <v-icon v-else>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "GstHeader",

  computed: {
    currentUser() {
      return this.$store.state.currentUser;
    }
  }
};
</script>
