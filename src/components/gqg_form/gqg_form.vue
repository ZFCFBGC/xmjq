<template>
  <div class="gqg_form">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "gqgForm",
  //祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。
   provide() {
    return { form: this }
  },
  props: {
    model: { type: Object },
    rules: { type: Object },
  },
  data() {
    return {
      fields: [],
    };
  },
  created() {
    this.$on("form-add", (field) => {
      if (field) {
        this.fields.push(field);
      }
    });
    this.$on("form-remove", (field) => {
      if (field.prop) {
        this.fields.splice(this.fields.indexOf(field), 1);
      }
    });
  }
};
</script>
<style lang="less" scoped></style>
