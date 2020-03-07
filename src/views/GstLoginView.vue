<template>
  <v-container>
    <v-layout justify-center>
      <GstLoginForm :onlogin="handleLogin" />
    </v-layout>
  </v-container>
</template>

<script>
import GstLoginForm from "@/components/molecules/GstLoginForm";
import Auth from "../api/auth";

export default {
  name: "GstLoginView",

  components: {
    GstLoginForm
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