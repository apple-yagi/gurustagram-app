<template>
  <div>
    <v-row v-if="user">
      <v-col cols="4">
        <v-layout justify-center>
          <img class="account_img" :src="user.photoURL" />
        </v-layout>
      </v-col>
      <v-col cols="8">
        <h2 class="display_name" style="vertical-align: middle;">{{ user.displayName }}</h2>
      </v-col>
    </v-row>

    <hr />

    <v-row>
      <v-col
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="4"
        v-for="(shop, index) in postedShops"
        :key="index"
        style="padding: 0;"
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
  </div>
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

.display_name {
  font-size: 2.5rem;
}

@media screen and (max-width: 480px) {
  .account_img {
    width: 60px;
    height: 60px;
  }

  .display_name {
    font-size: 1.5rem;
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
