<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-form v-model="valid">
          <v-layout justify-space-between>
            <v-text-field label="店名" v-model="shopName" outlined solo clearable />
            <GstButton
              :disabled="disableSearchAction"
              :tile="custom_GstButton.tile"
              :height="custom_GstButton.height"
              @click="handleClick"
            >
              <v-icon>mdi-magnify</v-icon>
              <span class="shrink ml-2 hidden-sm-and-down">検索</span>
            </GstButton>
          </v-layout>
          <GstAlertMessage
            v-show="custom_GstAlertMessage.error_msg"
            :alert-type="custom_GstAlertMessage.alertType"
            :message="custom_GstAlertMessage.error_msg"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GstButton from "@/components/atoms/GstButton";
import GstAlertMessage from "@/components/atoms/GstAlertMessage";

const custom_GstButton = {
  height: 55,
  tile: true
};

const custom_GstAlertMessage = {
  alertType: "error",
  error_msg: ""
};

export default {
  name: "GstPostForm",

  components: {
    GstButton,
    GstAlertMessage
  },

  props: {
    search: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      valid: true,
      progress: false,
      shoplist: "",
      shopName: "",
      shopNameRules: [v => !!v || "店名を入力してください"],
      custom_GstAlertMessage,
      custom_GstButton
    };
  },

  computed: {
    disableSearchAction() {
      return !this.valid || this.progress;
    }
  },

  methods: {
    handleClick(ev) {
      if (this.disableSearchAction) {
        return;
      }

      this.progress = true;
      this.error_msg = "";

      this.$nextTick(() => {
        this.search(this.shopName)
          .then(shops => {
            this.shoplist = shops;
          })
          .catch(err => {
            this.error_msg = err;
          })
          .finally(() => {
            this.progress = false;
          });
      });
    }
  }
};
</script>