<template>
  <v-dialog
    v-model="dialog"
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
          :src="currentShop.image_url.shop_image1"
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
          :disabled="valid"
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
</template>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import Post from "@/api/firebase/post";

export default {
  name: "GstPostForm",

  props: {
    currentShop: {
      type: Object,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },

  components: {
    GstAlertMessage
  },

  data() {
    return {
      description: null,
      message: null,
      alertType: null
    };
  },

  computed: {
    user() {
      return this.$store.state.currentUser;
    },

    valid() {
      return !this.description;
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
          this.$emit("set-message");
        })
        .catch(err => {
          this.message = err;
          this.alertType = "error";
        });
    },

    closeDialog: function() {
      this.$emit("close-dialog");
    }
  }
};
</script>