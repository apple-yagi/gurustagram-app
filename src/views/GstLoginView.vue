<template>
  <v-container>
    <GstLoginForm :onlogin="handleLogin" />
  </v-container>
</template>

<script>
import GstLoginForm from "@/components/molecules/GstLoginForm";
import Auth from "../api/firebase/auth";

export default {
  name: "GstLoginView",

  components: {
    GstLoginForm
  },

  beforeCreate() {
    if (this.$store.state.currentUser) {
      this.$router.push({ path: "/" });
    }
  },

  methods: {
    handleLogin(email, password) {
      return new Promise((resolve, reject) => {
        Auth.login(email, password)
          .then(() => {
            this.$router.push({ path: "/" });
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>