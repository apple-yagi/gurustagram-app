<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" lg="6">
        <v-form>
          <v-layout justify-space-between>
            <v-text-field label="店名" v-model="shopName" outlined solo clearable />
            <GstButton
              :tile="custom_GstButton.tile"
              :height="custom_GstButton.height"
              :loading="custom_GstButton.loading"
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
  tile: true,
  loading: false
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
      shopName: "",
      custom_GstAlertMessage,
      custom_GstButton
    };
  },

  methods: {
    handleClick(ev) {
      if (this.custom_GstButton.loading) {
        return;
      }

      this.custom_GstButton.loading = true;
      this.error_msg = "";

      this.$nextTick(() => {
        this.search(this.shopName)
          .then(() => {
            this.custom_GstAlertMessage.error_msg = "";
          })
          .catch(err => {
            this.custom_GstAlertMessage.error_msg = err;
          })
          .finally(() => {
            this.custom_GstButton.loading = false;
          });
      });
    }
  }
};
</script>