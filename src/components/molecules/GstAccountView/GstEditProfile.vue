<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        <v-layout justify-space-between>
          <span>Edit Profile</span>
          <v-btn @click="closeEditProfileDialog" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-layout>
      </v-card-title>

      <v-container>
        <v-form ref="form" v-model="valid">
          <v-row>
            <v-col cols="12" xs="10" sm="6">
              <v-layout justify-center>
                <label for="file_photo">
                  <img :src="uploadImage" style="width: 150px; border-radius: 50%;" />
                  <br />
                  <label class="upload-img-btn">
                    プロフィール画像を変更する
                    <input
                      type="file"
                      name="image"
                      id="image_file"
                      style="display: none;"
                      @change="onFileChange"
                    />
                  </label>
                </label>
              </v-layout>
            </v-col>

            <v-col cols="12" sm="5">
              <v-layout justify-center>
                <GstAlertMessage :message="message" :alert-type="alertType" />
              </v-layout>
              <v-layout justify-center>
                <v-text-field label="ユーザー名" v-model="displayName" :rules="nameRules" required></v-text-field>
              </v-layout>
            </v-col>

            <v-layout justify-end>
              <v-card-actions>
                <v-btn class="mr-5" :disabled="!valid" :loading="loading" @click="updateProfile">登録</v-btn>
              </v-card-actions>
            </v-layout>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.upload-img-btn {
  margin: 22px auto;
  padding: 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  max-width: 130px;
  text-align: center;
  display: block;
  background-color: #f1f1f1;
  color: #73a9ff;
  box-shadow: 0 2px 6px rgba(146, 146, 146, 0.8);
  cursor: pointer;
}
</style>

<script>
import GstButton from "@/components/atoms/GstButton";
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import Auth from "@/api/firebase/auth.js";

const REGEX = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

export default {
  name: "GstEditProfile",

  components: {
    GstAlertMessage,
    GstButton
  },

  props: {
    user: {
      type: Object,
      required: true
    },
    dialog: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      valid: true,
      displayName: this.user.displayName,
      nameRules: [v => !!v || "ユーザー名を登録してください"],
      uploadImage: this.user.photoURL,
      imageFile: this.user.photoURL,
      message: null,
      alertType: null,
      loading: false
    };
  },

  methods: {
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
      this.imageFile = files[0];
    },

    createImage(file) {
      this.imageFile = file;
      const reader = new FileReader();
      reader.onload = e => {
        this.uploadImage = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    closeEditProfileDialog() {
      this.$emit("closeEditProfileDialog");
    },

    updateProfile() {
      this.loading = true;
      this.message = "";
      this.alertType = "";

      Auth.updateProfile(this.displayName, this.imageFile)
        .then(() => {
          this.closeEditProfileDialog();
        })
        .catch(err => {
          this.message = err;
          this.alertType = "error";
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>