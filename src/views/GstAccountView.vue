<template>
  <v-container>
    <v-btn @click="signOut">サインアウト</v-btn>
  </v-container>
</template>

<script>
export default {
  name: "Account",

  data() {
    return {
      message: null
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },

  methods: {
    signOut: function() {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.message = err;
        });
    }
  }
};
</script>
