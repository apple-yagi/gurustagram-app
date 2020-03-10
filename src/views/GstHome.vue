<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ message }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import firebase from "firebase/app";
import "firebase/database";

export default {
  name: "home",
  components: {
    HelloWorld
  },

  data() {
    return {
      message: "データ"
    };
  },

  created() {
    var db = firebase.database().ref("Shops");
    db.on("value", function(snapshot) {
      this.message = snapshot.val();
    });
  }
};
</script>
