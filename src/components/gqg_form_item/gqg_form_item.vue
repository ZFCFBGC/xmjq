<template>
  <div class="gqg_form_item">
    <label class="gqg_form_item_label">{{ label }}</label>
    <div class="gqg_form_item_content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
import emitter from "@/mixins/emitter";
export default {
  name: "gqgFormItem",
  //获取祖先组件注入的依赖
  inject: ["form"],
  props: {
    label: { type: String, default: "" },
    prop: { type: String },
  },
  mixins: [emitter],

  data() {
    return {
      isRequired: false,
      isShowMes: false,
      message: "",
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    if (this.prop) {
      this.dispatch("gqgForm", "form-add", this);
      this.initialValue = this.fieldValue;
      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch("gqgForm", "form-remove", this);
  },
  methods: {
    setRules() {
      console.log("进来了吗");
      let rules = this.getRules();
      if (rules.length) {
        rules.forEach((rule) => {
          if (rule.required !== undefined) this.isRequired = rule.required;
        });
      }
      this.$on("form-blur", this.onFieldBlur);
      this.$on("form-change", this.onFieldChange);
    },
    getRules() {
      var formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return formRules;
    },
    // 过滤出符合要求的 rule 规则
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter(
        (rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1
      );
    },
    /**
     * 校验表单数据
     * @param trigger 触发校验类型
     * @param callback 回调函数
     */
    validate(trigger, cb) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) return true;
      // 使用 async-validator
      const validator = new AsyncValidator({ [this.prop]: rules });
      let model = { [this.prop]: this.fieldValue };
      validator.validate(model, { firstFields: true }, (errors) => {
        this.isShowMes = errors ? true : false;
        this.message = errors ? errors[0].message : "";
        if (cb) cb(this.message);
      });
    },
    resetField() {
      this.message = "";
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      debugger;
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
};
</script>
<style lang="less" scoped>
.gqg_form_item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  .gqg_form_item_label {
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .gqg_form_item_content {
    font-size: 14px;
  }
}
</style>
