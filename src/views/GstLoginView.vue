<template>
  <v-container fluid fill-height>
    <GstLoginForm :onlogin="handleLogin" />
  </v-container>
</template>

<script>
import GstLoginForm from "@/components/molecules/GstLoginView/GstLoginForm";
import Auth from "../api/firebase/auth";

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
      this.$router.push({ path: "/mypage" });
    }
  },

  created() {
    this.$store.dispatch("setCurrentUser").then(() => {
      this.$router.push({ path: "/mypage" });
    });
  },

  methods: {
    handleLogin(email, password) {
      return new Promise((resolve, reject) => {
        Auth.login(email, password)
          .then(() => {
            this.$store.dispatch("setCurrentUser").then(() => {
              this.$router.push({ path: "/mypage" });
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