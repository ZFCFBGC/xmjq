<template>
  <div
    class="gqg_form_item"
    :class="[
      {
        'is-error': validateState === 'error',
        'is-required': isRequired,
      },
    ]"
  >
    <label class="gqg_form_item_label" :style="'width:' + labelWidth">{{
      label
    }}</label>
    <div class="gqg_form_item_content">
      <slot></slot>
      <transition name="gqg_zoom_in_top">
        <slot
          v-if="validateState === 'error'"
          name="error"
          :error="validateMessage"
        >
          <div class="gqg_form_item__error">
            {{ validateMessage }}
          </div>
        </slot>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from "async-validator";
import emitter from "@/mixins/emitter";
import { getPropByPath } from "./utils";
export default {
  name: "gqgFormItem",
  //获取祖先组件注入的依赖
  inject: ["form"],
  props: {
    label: { type: String, default: "" },
    prop: { type: String },
    labelWidth: { type: String, default: "80px" },
  },
  mixins: [emitter],
  watch: {
    error: {
      immediate: true,
      handler(value) {
        this.validateMessage = value;
        this.validateState = value ? "error" : "";
      },
    },
    validateStatus(value) {
      this.validateState = value;
    },
  },
  data() {
    return {
      validateState: false,
      validateMessage: "",
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    },
    isRequired: {
      get() {
        let rules = this.form.rules;
        const prop = getPropByPath(rules, this.prop || "");
        rules = rules ? prop.o[this.prop || ""] || prop.v : [];
        let isRequired = false;
        if (rules && rules.length) {
          rules.every((rule) => {
            if (rule.required) {
              isRequired = true;
              return false;
            }
            return true;
          });
        }
        return isRequired;
      },
      set() {},
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
        this.validateState = !errors ? "success" : "error";
        this.validateMessage = errors ? errors[0].message : "";
        if (cb) cb(this.validateMessage);
      });
    },
    resetField() {
      this.validateMessage = "";
      this.form.model[this.prop] = this.initialValue;
    },
    onFieldBlur() {
      this.validate("blur");
    },
    onFieldChange() {
      this.validate("change");
    },
  },
};
</script>
<style lang="less" scoped>
.is-error {
  ::v-deep .gqg_input,
  .textarea-entity {
    border: 1px solid #f56c6c;
  }
}
.gqg_form_item {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
  &.is-required .gqg_form_item_label:before {
    content: "*";
    color: red;
    margin-right: 4px;
  }
  .gqg_form_item_label {
    text-align: right;
    vertical-align: middle;
    font-size: 14px;
    color: #606266;
    line-height: 34px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  .gqg_form_item_content {
    line-height: 34px;
    position: relative;
    font-size: 14px;
    .gqg_form_item__error {
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
}
</style>
