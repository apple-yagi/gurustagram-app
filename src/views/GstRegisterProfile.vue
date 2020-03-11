<template>
  <v-row>
    <v-layout justify-center>
      <v-col cols="12" md="8" lg="6">
        <v-card>
          <v-card-title class="headline">ユーザー名を登録してください</v-card-title>
          <v-form>
            <v-container>
              <v-form v-model="valid">
                <v-text-field label="ユーザー名" v-model="name" :rules="nameRules" outlined required></v-text-field>
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
                <v-layout justify-end>
                  <v-btn class="mr-5" :disabled="!valid && !loading" @click="setUsername">登録</v-btn>
                </v-layout>
              </v-form>
            </v-container>
          </v-form>
        </v-card>
      </v-col>
    </v-layout>
  </v-row>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "RegisterProfile",
  data() {
    return {
      valid: true,
      currentUser: null,
      name: null,
      nameRules: [v => !!v || "名前を入力してください"],
      password: null,
      passwordRules: [
        v => !!v || "パスワードを入力してください",
        v => (v && v.length >= 6) || "パスワードは6文字以上必要です"
      ],
      showPassword: false,
      loading: false
    };
  },

  beforeCreate() {
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      var email = window.localStorage.getItem("emailForSignIn");
      if (!email) {
        email = window.prompt("確認のためにメールアドレスを入力してください");
      }
      firebase
        .auth()
        .signInWithEmailLink(email, window.location.href)
        .then(result => {
          window.localStorage.removeItem("emailForSignIn");
        })
        .catch(error => {
          alert(error);
        })
        .finally(() => {
          this.currentUser = firebase.auth().currentUser;
        });
    }
  },

  methods: {
    setUsername: function() {
      this.loading = true;
      this.currentUser
        .updateProfile({
          displayName: this.name
        })
        .then(() => {
          this.currentUser
            .updatePassword(this.password)
            .then(() => {
              this.$router.push("/account");
            })
            .catch(error => {
              alert(error);
            });
        })
        .catch(error => {
          alert(error);
          this.loading = false;
        });
    }
  }
};
</script>
