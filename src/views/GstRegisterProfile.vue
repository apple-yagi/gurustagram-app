<template>
  <v-row>
    <v-layout justify-center>
      <v-col cols="12" md="10" lg="6">
        <v-card>
          <v-card-title class="headline">ユーザー情報を登録してください</v-card-title>
          <v-form>
            <v-container>
              <v-form v-model="valid">
                <v-row>
                  <v-col cols="12" xs="10" sm="6">
                    <v-layout justify-center>
                      <img :src="uploadImage" />
                    </v-layout>
                    <v-layout justify-center>
                      <input type="file" @change="onFileChange" />
                    </v-layout>
                  </v-col>

                  <v-col cols="12" xs="8" sm="5">
                    <v-layout justify-center>
                      <v-text-field label="ユーザー名" v-model="name" :rules="nameRules" required></v-text-field>
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
                </v-row>

                <v-layout justify-end>
                  <v-btn class="mr-5" :disabled="!valid && !loading" @click="setUserInfo">登録</v-btn>
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
import "firebase/database";

export default {
  name: "RegisterProfile",
  data() {
    return {
      valid: true,
      currentUser: null,
      imageFile: null,
      uploadImage: process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT,
      image_default: process.env.VUE_APP_ACCOUNT_IMAGE_DEFAULT,
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
    setUserInfo: function() {
      this.loading = true;

      if (this.imageFile) {
        var storageRef = firebase.storage().ref();
        var mountiansRef = storageRef.child(this.imageFile.name);

        mountiansRef.put(this.imageFile).then(snapshot => {
          mountiansRef.getDownloadURL().then(url => {
            this.currentUser
              .updateProfile({
                displayName: this.name,
                photoURL: url
              })
              .then(() => {
                this.currentUser
                  .updatePassword(this.password)
                  .then(() => {
                    firebase
                      .database()
                      .ref("users/" + this.currentUser.uid)
                      .set({
                        name: this.name,
                        photoURL: url
                      });
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
          });
        });
      } else {
        this.currentUser
          .updateProfile({
            displayName: this.name,
            photoURL: this.image_default
          })
          .then(() => {
            this.currentUser
              .updatePassword(this.password)
              .then(() => {
                firebase
                  .database()
                  .ref("users/" + this.currentUser.uid)
                  .set({
                    name: this.name,
                    photoURL: this.image_default
                  });
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
