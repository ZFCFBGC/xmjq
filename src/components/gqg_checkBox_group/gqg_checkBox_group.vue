<template>
  <div class="gqg_checkbox_group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "checkBoxGroup",
  componentName: "checkBoxGroup",
  props: {
    value: {
      type: Array,
      default: [],
    },
  },
  mounted() {},
  methods: {},
};
</script>
