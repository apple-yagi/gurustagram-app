<template>
  <v-col cols="12" sm="6" md="6" lg="4">
    <v-card @click="openDialog(shop)">
      <v-layout justify-center>
        <v-img class="white--text" height="300px" width="300px" :src="shop.image_url.shop_image1">
          <v-container fill-height fluid>
            <v-layout fill-height>
              <v-flex xs12 align-end flexbox>
                <span class="headline white--text">ぐるなび情報</span>
              </v-flex>
            </v-layout>
          </v-container>
        </v-img>
      </v-layout>
      <v-card-title>
        <div>
          <span class="grey-text">{{ shop.name }}</span>
          <br />
          <span>{{ shop.pr.pr_short }}</span>
        </div>
      </v-card-title>
      <v-col cols="12">
        <GstAlertMessage
          v-show="message"
          :alert-type="alertType"
          :message="message"
          transition="scale-transition"
        />
      </v-col>
    </v-card>

    <v-dialog
      v-model="dialog"
      v-if="currentShop == shop"
      transition="dialog-bottom-transition"
      max-width="600px"
      scrollable
      activator
    >
      <v-card>
        <v-layout justify-center>
          <v-img
            class="white--text"
            max-height="300px"
            max-width="600px"
            :src="shop.image_url.shop_image1"
          >
            <v-container fill-height fluid>
              <v-layout fill-height justify-space-between>
                <span class="headline white--text">ぐるなび情報</span>
                <v-btn text icon @click="closeDialog()">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-layout>
            </v-container>
          </v-img>
        </v-layout>
        <v-form>
          <v-btn
            v-if="!message"
            class="mt-5 ml-5"
            @click="pushShop(currentShop, user.uid)"
            onclick="disabled = true;"
          >
            <v-icon>mdi-send</v-icon>
            <span class="shrink ml-2 hidden-sm-and-down">投稿</span>
          </v-btn>
          <v-col v-else cols="12">
            <GstAlertMessage
              :alert-type="alertType"
              :message="message"
              transition="scale-transition"
            />
          </v-col>
          <v-col cols="12">
            <v-textarea rows="5" v-model="description" label="コメント・感想" outlined></v-textarea>
          </v-col>
        </v-form>
      </v-card>
    </v-dialog>
  </v-col>
</template>

<style scoped>
textarea {
  margin: 0;
  padding: 0;
}
</style>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import Post from "@/api/firebase/post";

export default {
  name: "ShopCard",
  props: {
    shop: {
      type: Object,
      required: true
    }
  },

  components: {
    GstAlertMessage
  },

  data() {
    return {
      currentShop: null,
      dialog: false,
      description: null,
      message: null,
      alertType: null
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    }
  },

  methods: {
    pushShop(shop, uid) {
      this.message = null;
      this.alertType = null;

      shop["description"] = this.description;
      shop["uid"] = uid;

      Post.postShop(shop)
        .then(message => {
          this.message = message;
          this.alertType = "success";
        })
        .catch(err => {
          this.message = err;
          this.alertType = "error";
        });
    },

    openDialog: function(shop) {
      this.dialog = true;
      this.currentShop = shop;
    },
    closeDialog: function() {
      this.dialog = false;
      this.currentShop = null;
    }
  }
};
</script>
