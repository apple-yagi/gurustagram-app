<template>
  <v-col cols="12" sm="6" md="6" lg="4">
    <v-card @click="openDialog(shop)">
      <v-layout justify-center>
        <v-img class="white--text" height="300px" width="300px" :src="shop.image_url.shop_image1">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline white--text">ぐるなび情報</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-layout>
      <v-card-title>
        <div>
          <span class="grey-text">{{ shop.name }}</span>
        </div>
      </v-card-title>
      <v-card-text>
        <h4>{{ shop.pr.pr_short }}</h4>
      </v-card-text>
      <v-col cols="12">
        <GstAlertMessage
          v-show="message"
          :alert-type="alertType"
          :message="message"
          transition="scale-transition"
        />
      </v-col>
    </v-card>
    <GstPostForm
      v-if="currentShop == shop"
      :dialog="dialog"
      :current-shop="currentShop"
      v-on:set-message="setMessage()"
      v-on:close-dialog="closeDialog()"
    />
  </v-col>
</template>

<style scoped>
textarea {
  margin: 0;
  padding: 0;
}
</style>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import GstPostForm from "@/components/molecules/GstPostView/GstPostForm";

export default {
  name: "ShopCard",
  props: {
    shop: {
      type: Object,
      required: true
    }
  },

  components: {
    GstAlertMessage,
    GstPostForm
  },

  data() {
    return {
      currentShop: null,
      dialog: false,
      message: null,
      alertType: null
    };
  },

  methods: {
    openDialog(shop) {
      this.dialog = true;
      this.currentShop = shop;
    },

    closeDialog() {
      this.dialog = false;
      this.currentShop = null;
    },

    setMessage() {
      this.message = "投稿できました";
      this.alertType = "success";
    }
  }
};
</script>
