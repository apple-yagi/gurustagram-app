<template>
  <v-app>
    <v-content class="brown lighten-5">
      <v-container>
        <v-layout wrap>
          <v-flex>
            <GstHeader v-if="mini" />
            <GstSideMenu v-else />
          </v-flex>
          <v-flex xs12 md10>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import GstHeader from "@/components/GstHeader";
import GstSideMenu from "@/components/GstSideMenu";

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
