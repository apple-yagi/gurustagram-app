<template>
  <v-container fluid>
    <v-layout justify-center>
      <GstSearchForm :search="handleSearch" />
    </v-layout>
  </v-container>
</template>

<script>
import GstSearchForm from "@/components/molecules/GstSearchForm";

export default {
  name: "GstPostView",

  components: {
    GstSearchForm
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
  }
};
</script>