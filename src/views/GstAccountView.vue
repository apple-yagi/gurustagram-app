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

    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="4"
        lg="3"
        v-for="(shop, index) in postedShops"
        :key="index"
      >
        <v-card @click="openDialog(shop)">
          <v-layout justify-center>
            <v-img class="shop_img" :src="shop.image_url.shop_image1">
              <v-container fill-height fluid>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text">ぐるなび情報</span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
          </v-layout>
          <v-card-text>
            <h4>コメント</h4>
            <span class="ml-3">{{ shop.description }}</span>
          </v-card-text>
        </v-card>

        <v-dialog
          v-model="dialog"
          v-if="currentShop == shop"
          transition="dialog-bottom-transition"
          max-width="600px"
          scrollable
          activator
        >
          <v-card @click="dialog = false">
            <v-layout>
              <v-img :src="currentShop.image_url.shop_image1">
                <v-container>
                  <v-flex xs12 align-end flexbox>
                    <span class="headline white--text">ぐるなび情報</span>
                  </v-flex>
                </v-container>
              </v-img>
              <v-img
                v-if="currentShop.image_url.shop_image2"
                class="dialog-img"
                :src="currentShop.image_url.shop_image2"
              ></v-img>
            </v-layout>

            <v-card-title>{{ currentShop.name }}</v-card-title>
            <hr />
            <v-card-text>
              <h3 class="pt-1">店舗情報</h3>
              <span>{{ currentShop.pr.pr_long }}</span>
              <br />
              <span>{{ currentShop.address }}</span>
              <br />
              <span>Tel : {{ currentShop.tel }}</span>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>

    <v-layout justify-end>
      <v-btn class="ml-5" @click="signOut">サインアウト</v-btn>
    </v-layout>
  </v-container>
</template>

<style scoped>
.account_img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
}

.shop_img {
  height: auto;
  object-fit: cover;
}

@media screen and (max-width: 480px) {
  .account_img {
    width: 60px;
    height: 60px;
  }
}

@media screen and (min-width: 600px) {
  .shop_img {
    height: 300px;
    object-fit: cover;
  }
}

@media screen and (min-width: 960px) {
  .shop_img {
    height: 250px;
    object-fit: cover;
  }
}
</style>

<script>
import ShopsDB from "@/api/firebase/shops";

export default {
  name: "Account",

  data() {
    return {
      message: null,
      postedShops: null,
      dialog: false,
      currentShop: null
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },

  async created() {
    this.postedShops = await ShopsDB.loadUserPostedShops(this.user);
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
    },

    openDialog: function(Shop) {
      this.currentShop = Shop;
      this.dialog = true;
    }
  }
};
</script>
