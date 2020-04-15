<template>
  <v-container>
    <v-layout justify-center>
      <GstSearchForm @refPostedShops="refPostedShops($event)" />
    </v-layout>
    <div class="responsive-img-size" style="margin: auto;">
      <div v-for="(shop, index) in postedShops" :key="index">
        <GstPostedCard :Shop="shop" v-on:openDialog="openDialog(shop)" />
        <GstPostedDialog
          v-if="currentShop == shop"
          :current-shop="currentShop"
          :dialog="dialog"
          v-on:closeDialog="closeDialog()"
        />
      </div>
    </div>
  </v-container>
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

hr {
  border-top: 1px dotted #bbb;
  border-bottom: 1px dotted #fff;
}
</style>

<script>
import GstSearchForm from "@/components/molecules/GstSearchView/GstSearchForm";
import GstPostedCard from "@/components/molecules/GstPostedCard";
import GstPostedDialog from "@/components/molecules/GstPostedDialog";

export default {
  name: "GstSearchView",

  components: {
    GstSearchForm,
    GstPostedCard,
    GstPostedDialog
  },

  data() {
    return {
      postedShops: [],
      currentShop: null,
      dialog: false
    };
  },

  methods: {
    refPostedShops(eventVal) {
      this.postedShops = eventVal;
    },

    openDialog: function(shop) {
      this.currentShop = shop;
      this.dialog = true;
    },

    closeDialog() {
      this.currentShop = null;
      this.dialog = false;
    }
  }
};
</script>