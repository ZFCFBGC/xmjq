<template>
  <div class="el-radio-group">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "RadioGroup",
  componentName: "RadioGroup",
  props: {
    value: {},
  },
  created() {
    this.$on("handleChange", (value) => {
      this.$emit("change", value);
    });
  },
  mounted() {},
  methods: {},
};
</script>
