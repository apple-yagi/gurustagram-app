<template>
  <div class="home">
    <GstAlertMessage v-show="message" :alert-type="alertType" :message="message" />

    <div class="responsive-img-size" style="margin: auto;">
      <div v-for="(shop, index) in Shops" :key="index">
        <GstPostedCard :Shop="shop" v-on:openDialog="openDialog(shop)" />
        <GstPostedDialog
          v-if="currentShop == shop"
          :current-shop="currentShop"
          :dialog="dialog"
          v-on:closeDialog="closeDialog()"
        />
      </div>
    </div>
  </div>
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
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import GstPostedCard from "@/components/molecules/GstPostedCard";
import GstPostedDialog from "@/components/molecules/GstPostedDialog";
import firebase from "firebase/app";

export default {
  name: "home",

  components: {
    GstAlertMessage,
    GstPostedCard,
    GstPostedDialog
  },

  data() {
    return {
      currentShop: null,
      dialog: false,
      message: null,
      alertType: "error",
      postedShops: []
    };
  },

  beforeCreate() {
    this.$store.dispatch("setShops").catch(err => {
      this.message = err;
    });
  },

  created() {
    firebase
      .database()
      .ref("shops")
      .on("value", snapshot => {
        if (snapshot.val()) {
          for (let shop in snapshot.val()) {
            this.postedShops.push(snapshot.val()[shop]);
          }
        }
      });
  },

  watch: {
    postedShops: function(val, oldVal) {
      this.$store.dispatch("setShops").catch(err => {
        this.message = err;
      });
    }
  },

  methods: {
    openDialog: function(Shop) {
      this.currentShop = Shop;
      this.dialog = true;
    },

    closeDialog() {
      this.currentShop = null;
      this.dialog = false;
    }
  },

  computed: {
    Shops() {
      return this.$store.getters.reverseShops;
    }
  }
};
</script>
