<template>
  <v-container>
    <v-layout justify-center>
      <GstLoginForm :onlogin="handleLogin" />
    </v-layout>
  </v-container>
</template>

<script>
import GstLoginForm from "@/components/molecules/GstLoginForm";

export default {
  name: "GstLoginView",

  components: {
    GstLoginForm
  },

  methods: {
    handleLogin(authInfo) {
      return this.$store
        .dispatch("login", authInfo)
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