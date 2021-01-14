<template>
  <label class="checkbox">
    <input
      type="checkbox"
      :checked="checked"
      @change="handleChange"
      :disabled="disabled"
      :class="['checkbox', checked && 'checked', disabled && 'disabled']"
    />
    <div class="show-box" />
    <div class="check-text"><slot /></div>
  </label>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "checked",
    event: "change",
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
  }
}
</style>
