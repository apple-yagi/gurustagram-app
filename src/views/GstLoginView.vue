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
      return Auth.login(email, password)
        .then(() => {
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          this.throwReject(err);
        });
    },
    throwReject(err) {
      return Promise.reject(err);
    }
  }
};
</script>