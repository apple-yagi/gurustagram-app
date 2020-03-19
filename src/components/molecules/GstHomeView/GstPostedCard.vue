<template>
  <v-card>
    <v-card-title v-if="User">
      <img :src="User.photoURL" width="30" height="30" style="border-radius:50%;" />
      <span class="ml-2">{{ User.name }}</span>
    </v-card-title>
    <v-card-title v-else>
      <img :src="noUser.photoURL" width="30" height="30" style="border-radius:50%;" />
      <span class="ml-2">{{ noUser.name }}</span>
    </v-card-title>
    <v-layout justify-center>
      <v-img
        class="white--text responsive-img-size"
        :src="Shop.image_url.shop_image1"
        @click="openDialog()"
      >
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
      User: null,
      noUser: {
        name: null,
        photoURL: null
      }
    };
  },

  created() {
    Auth.getUserInfo(this.Shop.uid)
      .then(user => {
        this.User = user;
      })
      .catch(err => {
        this.noUser = {
          name: err,
          photoURL: process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT
        };
      });
  },

  methods: {
    openDialog() {
      this.$emit("openDialog");
    }
  }
};
</script>