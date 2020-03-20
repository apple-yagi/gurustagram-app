<template>
  <v-container fluid>
    <v-row v-if="user">
      <v-col cols="4">
        <v-layout justify-center>
          <img class="account_img" :src="user.photoURL" />
        </v-layout>
      </v-col>
      <v-col cols="8">
        <div class="mt-7">
          <h2>{{ user.displayName }}</h2>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="4"
        v-for="(shop, index) in postedShops"
        :key="index"
      >
        <GstPostedCard :Shop="shop" v-on:openDialog="openDialog(shop)" />
        <GstPostedDialog
          v-if="currentShop == shop"
          :current-shop="currentShop"
          :dialog="dialog"
          v-on:closeDialog="closeDialog()"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.account_img {
  width: 125px;
  height: 125px;
  border-radius: 50%;
}

.shop_img {
  height: auto;
  object-fit: cover;
}

@media screen and (max-width: 480px) {
  .account_img {
    width: 60px;
    height: 60px;
  }
}

@media screen and (min-width: 600px) {
  .shop_img {
    height: 300px;
    object-fit: cover;
  }
}

@media screen and (min-width: 960px) {
  .shop_img {
    height: 250px;
    object-fit: cover;
  }
}
</style>

<script>
import GstPostedCard from "@/components/molecules/GstPostedCard";
import GstPostedDialog from "@/components/molecules/GstPostedDialog";
import ShopsDB from "@/api/firebase/shops";

export default {
  name: "Account",

  components: {
    GstPostedCard,
    GstPostedDialog
  },

  data() {
    return {
      message: null,
      postedShops: null,
      dialog: false,
      currentShop: null
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },

  async created() {
    this.postedShops = await ShopsDB.loadUserPostedShops(this.user);
  },

  methods: {
    signOut: function() {
      this.$store
        .dispatch("signOut")
        .then(() => {
          this.$router.push({ path: "/login" });
        })
        .catch(err => {
          this.message = err;
        });
    },

    openDialog: function(Shop) {
      this.currentShop = Shop;
      this.dialog = true;
    },

    closeDialog() {
      this.currentShop = null;
      this.dialog = false;
    }
  }
};
</script>
