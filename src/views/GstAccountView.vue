<template>
  <v-container fluid>
    <v-row v-if="user">
      <v-col cols="4">
        <v-layout justify-center>
          <img class="account_img" :src="user.photoURL" />
        </v-layout>
      </v-col>
      <v-col cols="8">
        <div class="mt-7">
          <h2>{{ user.displayName }}</h2>
        </div>
      </v-col>
    </v-row>
    <!-- <v-layout justify-end>
      <v-btn class="ml-5" @click="signOut">サインアウト</v-btn>
    </v-layout>-->
  </v-container>
</template>

<style scoped>
.account_img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
}

@media screen and (max-width: 480px) {
  .account_img {
    width: 60px;
    height: 60px;
  }
}
</style>

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
