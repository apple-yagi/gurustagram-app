<template>
  <v-btn :tile="tile" :class="classes" :height="height" :disabled="disabled" @click="handleClick">
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
    },
    height: {
      type: Number,
      default: 40
    },
    tile: {
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