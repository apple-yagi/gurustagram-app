<template>
  <v-card @click="openDialog()">
    <v-card-title>
      <img :src="User.photoURL" width="30" height="30" />
      {{ User.name }}
    </v-card-title>
    <v-layout justify-center>
      <v-img class="white--text responsive-img-size" :src="Shop.image_url.shop_image1">
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline white--text">ぐるなび情報</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
    </v-layout>
    <v-card-subtitle>
      <div class="text--primary">
        <h3 class="mb-0">{{ Shop.name }}</h3>
      </div>
    </v-card-subtitle>
    <v-card-text class="responsive-font-size">
      <h4>コメント</h4>
      <span class="ml-3">{{ Shop.description }}</span>
    </v-card-text>
  </v-card>
</template>

<style scoped>
@media screen and (min-width: 767px) {
  .responsive-img-size {
    width: 550px;
    height: 450px;
  }
}
</style>

<script>
import Auth from "@/api/firebase/auth";

export default {
  name: "GstPostedCard",

  props: {
    Shop: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      User: null
    };
  },

  created() {
    Auth.getUserInfo(this.Shop.uid)
      .then(user => {
        this.User = user;
      })
      .catch(err => {
        this.User = err;
      });
  },

  methods: {
    openDialog() {
      this.$emit("openDialog");
    }
  }
};
</script>