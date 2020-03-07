<template>
  <v-card max-width="400px" class="mx-auto mt-5">
    <v-card-title class="headline">ログイン</v-card-title>
    <v-form ref="form" v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" outlined required></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :rules="passwordRules"
              label="Password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-layout justify-end>
            <GstButton :disabled="disableLoginAction" @click="handleClick">ログイン</GstButton>
          </v-layout>
          <v-layout justify-end>
            <router-link to="/signup" class="mr-5">アカウントをお持ちでない方はこちらへ</router-link>
          </v-layout>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script>
import GstButton from "@/components/atoms/GstButton";
import firebase from "firebase/app";
import "firebase/auth";

const REGEX_EMAIL = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default {
  name: "GstLoginForm",
  components: {
    GstButton
  },

  props: {
    onlogin: {
      type: Function,
      required: true
    }
  },

  data() {
    return {
      valid: true,
      progress: false,
      email: null,
      emailRules: [
        v => !!v || "メールアドレスを入力してください",
        v => /.+@.+\..+/.test(v) || "メールアドレスを入力してください"
      ],
      password: null,
      passwordRules: [v => !!v || "パスワードを入力してください"],
      showPassword: false,
      error_msg: null
    };
  },

  computed: {
    disableLoginAction() {
      // validを使ってログイン処理の可否、progressは後述
      return !this.valid || this.progress;
    }
  },

  methods: {
    handleClick(ev) {
      if (this.disableLoginAction) {
        return;
      }

      this.progress = true;
      this.error_msg = "";

      this.$nextTick(() => {
        this.onlogin(this.email, this.password)
          .catch(err => {
            this.error_msg = err.message;
          })
          .then(() => {
            this.progress = false;
          });
      });
    }
  }
};
</script>
