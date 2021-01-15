<template>
  <label
    class="checkbox"
    :class="['checkbox', checked && 'checked', disabled && 'disabled']"
  >
    <input
      type="checkbox"
      :name="name"
      v-model="model"
      @change="handleChange"
      :disabled="disabled"
    />
    <div class="show-box" />
    <div class="check-text" v-if="$slots.default || label">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </div>
  </label>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    value: {
      default: "",
    },
    label: {},
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      default: "checkBoxName",
    },
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        console.log('组件名：',parent.$options.componentName)
        if (parent.$options.componentName !== "checkBoxGroup") {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        console.log("值选择：", this._checkboxGroup);
        return this.isGroup ? this._checkboxGroup : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("checkBoxGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
      },
    },
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.checked);
    },
  },
};
</script>

<style lang="less" scoped>
.checkbox {
  position: relative;
  user-select: none;
  height: 18px;
  margin-right: 4px;
  overflow: hidden;
  cursor: pointer;
  input {
    cursor: pointer;
    width: 0;
    height: 0;
  }
  input:checked + .show-box {
    background: #67b83c;
  }
  &.disabled {
    cursor: not-allowed;
    .show-box {
      background-color: #edf2fc;
      border-color: #dcdfe6;
    }
    .check-text {
      color: #c0c4cc;
    }
  }
  .show-box {
    position: relative;
    vertical-align: text-top;
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border: 1px solid #d8d8d8;
    background: #fff;

    &:before {
      content: "";
      position: absolute;
      top: 2px;
      left: 6px;
      width: 3px;
      height: 8px;
      border: solid #fff;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
  .check-text {
    display: inline-block;
    vertical-align: text-top;
    margin-left: 4px;
    line-height: 18px;
    font-size: 14px;
    color: #606266;
  }
}
</style>
