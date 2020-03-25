<template>
  <v-container fluid fill-height>
    <v-row class="ma-auto">
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

                  <v-col cols="12" xs="8" sm="5" xl="7">
                    <v-layout justify-center>
                      <GstAlertMessage :message="message" :alert-type="alertType" />
                    </v-layout>
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
  </v-container>
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
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import Auth from "@/api/firebase/auth";

const REGEX = /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/;

export default {
  name: "GstSignupView",

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
    async signUp() {
      if (this.$refs.form.validate()) {
        this.loading = true;
        this.message = null;
        this.alertType = null;

        // ユーザー登録
        await Auth.signUp(this.email, this.password).catch(err => {
          this.message = "ユーザー登録に失敗しました";
          this.alertType = "error";
          this.loading = false;
        });

        // ユーザーの名前、プロフィール画像を登録
        await Auth.updateProfile(this.name, this.imageFile).catch(error => {
          this.message = "profile登録エラー";
          this.alertType = "error";
          this.loading = false;
        });

        // ユーザー情報を取得
        await this.$store.dispatch("setCurrentUser");

        // マイページへ遷移
        this.$router.push({ path: "/account" });
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
