<template>
  <v-alert :type="alertType">{{ message }}</v-alert>
</template>

<script>
export default {
  name: "GstAlertMessage",

  props: {
    alertType: {
      default: "info"
    },
    message: {
      type: String,
      default: ""
    }
  }
};
</script>