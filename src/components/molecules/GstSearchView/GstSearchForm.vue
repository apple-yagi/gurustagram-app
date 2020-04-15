<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8" lg="6">
        <v-form>
          <v-layout justify-space-between>
            <v-select v-model="selectedArea" :items="areaList" attach chips label="エリア" />
            <GstButton
              :tile="custom_GstButton.tile"
              :height="custom_GstButton.height"
              :loading="custom_GstButton.loading"
              @click="searchShops()"
            >
              <v-icon>mdi-magnify</v-icon>
              <span class="shrink ml-2 hidden-sm-and-down">検索</span>
            </GstButton>
          </v-layout>
          <GstAlertMessage
            v-show="notPostedShops"
            :alert-type="custom_GstAlertMessage.alertType"
            :message="custom_GstAlertMessage.error_msg"
          />
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import areaList from "./GstAreaList";
import areaCodeList from "./GstAreaCodeList";
import GstButton from "@/components/atoms/GstButton";
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import { Shops } from "@/api/index";

const custom_GstButton = {
  height: 50,
  loading: false
};

const custom_GstAlertMessage = {
  alertType: "error",
  error_msg: "投稿された記事はありません"
};

export default {
  name: "GstSearchForm",

  components: {
    GstButton,
    GstAlertMessage
  },

  data() {
    return {
      selectedArea: "",
      areaList,
      areaCodeList,
      postedShops: [],
      custom_GstButton,
      custom_GstAlertMessage
    };
  },

  methods: {
    async searchShops() {
      if (this.custom_GstButton.loading) {
        return;
      }

      this.custom_GstButton.loading = true;

      // 選択された都道府県のPREFコードを取得
      let selectedAreaCode = this.areaCodeList[0][this.selectedArea];

      // PREFコードから該当する記事を取得
      this.postedShops = await Shops.loadPostedShopsByAreaCode(
        selectedAreaCode
      );

      // 親コンポーネントに伝搬
      this.$emit("refPostedShops", this.postedShops);

      this.custom_GstButton.loading = false;
    }
  },

  computed: {
    notPostedShops() {
      return this.postedShops.length == 0;
    }
  }
};
</script>