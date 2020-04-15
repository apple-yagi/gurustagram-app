<template>
  <v-container>
    <v-layout justify-center>
      <GstSearchForm />
    </v-layout>
  </v-container>
</template>

<script>
import GstSearchForm from "@/components/molecules/GstSearchView/GstSearchForm";

export default {
  name: "GstSearchView",

  components: {
    GstSearchForm
  }
};
</script>