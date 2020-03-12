<template>
  <div class="home">
    <GstAlertMessage v-show="message" :alert-type="alertType" :message="message" />

    <v-row class="responsive-img-size" style="margin: auto;">
      <v-col class="py-5" v-for="(Shop, index) in Shops" :key="index" cols="12">
        <v-card @click.stop="openDialog(Shop)">
          <v-card-title>{{ Shop.uid }}</v-card-title>
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
          <hr />
          <v-card-text class="responsive-font-size">
            <h4>コメント</h4>
            <br />
            <span class="ml-3">{{ Shop.description }}</span>
          </v-card-text>
        </v-card>
        <v-dialog
          v-model="dialog"
          v-if="currentShop == Shop"
          transition="dialog-bottom-transition"
          max-width="600px"
          scrollable
          activator
        >
          <v-card @click="dialog = false">
            <v-layout>
              <v-img
                class="white--text responsive-dialog-img"
                :src="currentShop.image_url.shop_image1"
              >
                <v-container fill-height fluid>
                  <v-layout fill-height>
                    <v-flex xs12 align-end flexbox>
                      <span class="headline white--text">ぐるなび情報</span>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-img>
              <v-img class="responsive-dialog-img" :src="currentShop.image_url.shop_image2"></v-img>
            </v-layout>
            <v-card-title>{{ currentShop.name }}</v-card-title>
            <hr />
            <v-card-text>
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
  </div>
</template>

<style scoped>
@media screen and (min-width: 767px) {
  .responsive-img-size {
    width: 550px;
    height: 450px;
  }
  .responsive-font-size {
    font-size: 1.25rem;
  }
}

@media screen and (max-width: 767px) {
  .responsive-dialog-img {
    width: 50%;
  }
}

hr {
  border-top: 1px dotted #bbb;
  border-bottom: 1px dotted #fff;
}
</style>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";

export default {
  name: "home",

  components: {
    GstAlertMessage
  },

  data() {
    return {
      currentShop: null,
      dialog: false,
      message: null,
      alertType: "error"
    };
  },

  beforeCreate() {
    this.$store.dispatch("setShops").catch(err => {
      this.message = err;
    });
  },

  methods: {
    openDialog: function(Shop) {
      this.currentShop = Shop;
      this.dialog = true;
    }
  },

  computed: {
    Shops() {
      return this.$store.getters.reverseShops;
    }
  }
};
</script>
