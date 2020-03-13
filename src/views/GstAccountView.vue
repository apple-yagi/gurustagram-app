<template>
  <v-container>
    <v-row v-if="user">
      <v-col cols="12">
        <img :src="user.photoURL" />
        {{ user.displayName }}
      </v-col>
    </v-row>
    <v-layout justify-end>
      <v-btn class="ml-5" @click="signOut">サインアウト</v-btn>
    </v-layout>
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
