<template>
  <div class="home">
    <GstAlertMessage v-show="message" :alert-type="alertType" :message="message" />

    <div class="responsive-img-size" style="margin: auto;">
      <div v-for="(Shop, index) in Shops" :key="index">
        <GstPostedCard :Shop="Shop" v-on:openDialog="openDialog(Shop)" />

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
              <h3 class="pt-1">店舗情報</h3>
              <span>{{ currentShop.pr.pr_long }}</span>
              <br />
              <span>{{ currentShop.address }}</span>
              <br />
              <span>Tel : {{ currentShop.tel }}</span>
            </v-card-text>
          </v-card>
        </v-dialog>
      </div>
    </div>
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
import GstPostedCard from "@/components/molecules/GstHomeView/GstPostedCard";

export default {
  name: "home",

  components: {
    GstAlertMessage,
    GstPostedCard
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
