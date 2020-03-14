<template>
  <v-container>
    <GstLoginForm :onlogin="handleLogin" />
  </v-container>
</template>

<script>
import GstLoginForm from "@/components/molecules/GstLoginView/GstLoginForm";
import Auth from "../api/firebase/auth";

import firebase from "firebase/app";
import "firebase/storage";
import "firebase/auth";

export default {
  name: "GstLoginView",

  components: {
    GstLoginForm
  },

  data() {
    return {
      image: null
    };
  },

  beforeCreate() {
    if (this.$store.state.currentUser) {
      this.$router.push({ path: "/account" });
    }
  },

  created() {
    this.$store.dispatch("setCurrentUser").then(() => {
      this.$router.push({ path: "/account" });
    });
  },

  methods: {
    handleLogin(email, password) {
      return new Promise((resolve, reject) => {
        Auth.login(email, password)
          .then(() => {
            this.$store.dispatch("setCurrentUser").then(() => {
              this.$router.push({ path: "/account" });
            });
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
</script>