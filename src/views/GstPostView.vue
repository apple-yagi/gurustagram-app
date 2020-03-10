<template>
  <v-container fluid>
    <v-layout justify-center>
      <GstSearchForm :search="handleSearch" />
    </v-layout>
    <v-row>
      <GstShopCard v-for="shop in shops" :key="shop.name" :shop="shop" />
    </v-row>
  </v-container>
</template>

<script>
import GstSearchForm from "@/components/molecules/GstSearchForm";
import GstShopCard from "@/components/molecules/GstShopCard";

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