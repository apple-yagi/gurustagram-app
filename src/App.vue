<template>
  <v-app>
    <GstHeader v-if="mini" />
    <GstSideMenu v-else />

    <v-content>
      <v-container>
        <router-view />
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
body,
main {
  background-color: #efebe9;
}
</style>

<script>
import GstHeader from "@/components/navigation/GstHeader";
import GstSideMenu from "@/components/navigation/GstSideMenu";

export default {
  name: "App",

  components: {
    GstHeader,
    GstSideMenu
  },

  data() {
    return {
      width: window.innerWidth
    };
  },

  methods: {
    handleResize() {
      this.width = window.innerWidth;
    }
  },

  computed: {
    mini() {
      return this.width < 960;
    }
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
  }
};
</script>
