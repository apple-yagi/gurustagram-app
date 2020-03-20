<template>
  <v-container fluid>
    <h3 class="ml-5 pt-3" style="color: #a1887f;">投稿するお店の店名を入力してください</h3>
    <v-layout justify-center>
      <GstSearchForm :search="handleSearch" />
    </v-layout>
    <v-row>
      <GstShopCard v-for="shop in shops" :key="shop.name" :shop="shop" />
    </v-row>
  </v-container>
</template>

<script>
import GstSearchForm from "@/components/molecules/GstPostView/GstSearchForm";
import GstShopCard from "@/components/molecules/GstPostView/GstShopCard";

export default {
  name: "GstPostView",

  components: {
    GstSearchForm,
    GstShopCard
  },

  methods: {
    handleSearch(shopName) {
      return this.$store
        .dispatch("searchShops", shopName)
        .catch(err => this.throwReject(err));
    },
    throwReject(err) {
      return Promise.reject(err);
    }
  },

  computed: {
    shops() {
      return this.$store.state.searchShops;
    }
  }
};
</script>