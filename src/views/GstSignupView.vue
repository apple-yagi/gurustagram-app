<template>
  <v-card max-width="400px" class="mx-auto mt-5">
    <v-card-title class="headline">ユーザー登録</v-card-title>
    <v-row>
      <v-layout justify-center>
        <v-col cols="10">
          <GstAlertMessage v-show="message" :alert-type="alertType" :message="message"></GstAlertMessage>
        </v-col>
      </v-layout>
    </v-row>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field :rules="emailRules" label="E-mail" v-model="email" outlined required></v-text-field>
          </v-col>
          <v-layout justify-end>
            <v-btn class="mr-5" :disabled="!valid" :loading="loading" @click="signUp">登録</v-btn>
          </v-layout>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import GstAlertMessage from "@/components/atoms/GstAlertMessage";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Signup",
  components: {
    GstAlertMessage
  },
  data() {
    return {
      valid: true,
      email: null,
      emailRules: [
        v => !!v || "メールアドレスを入力してください",
        v => /.+@.+\..+/.test(v) || "メールアドレスを入力してください"
      ],
      message: null,
      alertType: null,
      loading: false
    };
  },
  methods: {
    signUp: function() {
      var actionCodeSettings = {
        // url: "https://gurustagram-a34df.firebaseapp.com/?#/registerprofile",
        url: "http://localhost:8080/?#/registerprofile",
        handleCodeInApp: true
      };

      if (this.$refs.form.validate()) {
        this.loading = true;
        this.message = null;
        this.alertType = null;

        firebase
          .auth()
          .sendSignInLinkToEmail(this.email, actionCodeSettings)
          .then(() => {
            window.localStorage.setItem("emailForSignIn", this.email);
            this.message = "メールを送信しました";
            this.alertType = "success";
          })
          .catch(error => {
            this.message = "登録に失敗しました";
            this.alertType = "error";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  }
};
</script>
