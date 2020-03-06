<template>
  <v-btn :class="classes" :disabled="disabled" @click="handleClick">
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "GstButton",

  props: {
    classes: {
      type: String,
      default: "btn"
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick(ev) {
      this.$emit("click", ev);
    }
  }
};
</script>