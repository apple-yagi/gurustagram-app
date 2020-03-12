<template>
  <v-app>
    <GstHeader v-if="mini" />
    <GstSideMenu v-else />

    <v-content>
      <router-view />
    </v-content>

    <GstFooter v-if="mini" />
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
import GstFooter from "@/components/navigation/GstFooter";

export default {
  name: "App",

  components: {
    GstHeader,
    GstSideMenu,
    GstFooter
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
