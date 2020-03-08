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
      return new Promise((resolve, reject) => {});
    }
  }
};
</script>