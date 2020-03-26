<template>
  <v-dialog
    v-model="dialog"
    transition="dialog-bottom-transition"
    max-width="600px"
    scrollable
    persistent
    activator
  >
    <v-card @click="closeDialog()">
      <v-layout>
        <v-img
          class="white--text responsive-dialog-img"
          :src="currentShop.image_url.shop_image1"
          alt="shopImage"
          style="max-height: 250px;"
        >
          <v-container fluid>
            <v-layout>
              <v-flex xs12 align-end flexbox>
                <span class="headline white--text">ぐるなび情報</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
        <v-img
          v-if="currentShop.image_url.shop_image2"
          class="responsive-dialog-img"
          :src="currentShop.image_url.shop_image2"
          alt="shopImage"
          style="max-height: 250px;"
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
</template>

<style scoped>
@media screen and (max-width: 767px) {
  .responsive-dialog-img {
    width: 50%;
  }
}
</style>

<script>
export default {
  name: "GstPostedDialog",

  props: {
    currentShop: {
      type: Object
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },

  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    }
  }
};
</script>