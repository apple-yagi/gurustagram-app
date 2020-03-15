<template>
  <v-row>
    <v-layout justify-center>
      <v-col cols="12" md="11" lg="8">
        <v-card>
          <v-card-title class="headline">ユーザー登録</v-card-title>
          <v-container>
            <v-form ref="form" v-model="valid">
              <v-row>
                <v-col cols="12" xs="10" sm="6">
                  <v-layout justify-center>
                    <label for="file_photo">
                      <img :src="uploadImage" style="width: 150px; border-radius: 50%;" />
                      <input type="file" style="display: none;" @change="onFileChange" />
                    </label>
                  </v-layout>
                </v-col>

                <v-col cols="12" xs="8" sm="5">
                  <v-layout justify-center>
                    <v-text-field label="ユーザー名" v-model="name" :rules="nameRules" required></v-text-field>
                  </v-layout>
                  <v-layout justify-center>
                    <v-text-field label="Email" v-model="email" :rules="emailRules" required></v-text-field>
                  </v-layout>
                  <v-layout justify-center>
                    <v-text-field
                      v-model="password"
                      :rules="passwordRules"
                      label="Password"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="showPassword ? 'text' : 'password'"
                      @click:append="showPassword = !showPassword"
                      required
                    ></v-text-field>
                  </v-layout>
                </v-col>

                <v-layout justify-end>
                  <v-btn class="mr-5" :disabled="!valid" :loading="loading" @click="signUp">登録</v-btn>
                </v-layout>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-col>
    </v-layout>
  </v-row>
</template>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import Auth from "@/api/firebase/auth";

const REGEX = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

export default {
  name: "Signup",
  components: {
    GstAlertMessage
  },
  data() {
    return {
      valid: true,
      name: null,
      nameRules: [v => !!v || "ユーザー名を登録してください"],
      email: null,
      emailRules: [
        v => !!v || "メールアドレスを入力してください",
        v => REGEX.test(v) || "フォーマットが違います"
      ],
      password: null,
      passwordRules: [
        v => !!v || "パスワードを入力してください",
        v => (v && v.length >= 6) || "パスワードは6文字以上必要です"
      ],
      showPassword: false,
      imageFile: process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT,
      uploadImage: process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT,
      message: null,
      alertType: null,
      loading: false
    };
  },

  methods: {
    signUp() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.message = null;
        this.alertType = null;

        Auth.signUp(this.email, this.password)
          .then(user => {
            Auth.updateProfile(this.name, this.imageFile)
              .then(() => {
                this.$store.dispatch("setCurrentUser").then(() => {
                  this.$router.push({ path: "/account" });
                });
              })
              .catch(error => {
                this.message = error;
                this.alertType = "error";
              });
          })
          .catch(err => {
            this.message = err;
            this.alertType = "error";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

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
    }
  }
};
</script>
