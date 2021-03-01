<template>
  <div class="gqg_input" :style="{ width }">
    <input
      v-model="myValue"
      @input="handleInput"
      @blur="handleBlur"
      @focus="handleFocus"
      :style="{ width }"
      :placeholder="placeholder"
      :type="type"
      :disabled="disabled"
      :class="['input-entity', clearable && 'input-right-fix']"
      ref="input"
    />
    <div class="close-box" @click="handleClear">
      <div v-if="clearable" :class="['input-close', focus && 'close-show']" />
    </div>
  </div>
</template>
<script>
import emitter from "@/mixins/emitter";
export default {
  name: "gqgInput",
  props: {
    val: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
    // 是否可清除
    clearable: {
      type: Boolean,
      default: false,
    },
    // 默认宽度
    width: {
      type: String,
      default: "180px",
    },
    // 原始输入框类型
    type: {
      type: String,
      default: "text",
    },
    // 表单验证事件
    validateEvent: {
      type: Boolean,
      default: true,
    }
  },
  mixins: [emitter],
  //model中prop接受v-model传递的值
  model: {
    prop: "val",
    event: "input",
  },
  data() {
    return {
      myValue: this.val,
      focus: false,
    };
  },
  watch: {
    val(newVal) {
      this.myValue = newVal;
    },
  },
  created() {},
  methods: {
    // 切换 聚焦/失焦
    toggleFocus(value) {
      setTimeout(() => (this.focus = value), 20);
    },
    // 输入回调
    handleInput(e) {
      this.$emit("input", e.target.value);
    },
    // 失焦回调
    handleBlur(e) {
      this.$emit("blur", e.target.value);
      if (this.validateEvent) {
        this.dispatch("gqgFormItem", "form-blur", e.target.value);
      }
      this.toggleFocus(false);
    },
    // 聚焦回调
    handleFocus(e) {
      this.$emit("focus", e.target.value);
      this.toggleFocus(true);
    },
    // 清空
    handleClear() {
      this.$emit("input", "");
      this.toggleFocus(true);
    },
  },
};
</script>
<style lang="less" scoped>
.gqg_input {
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  height: 32px;
  border-radius: 4px;
  border: 1px solid #eaedea;
  background: #fff;
  transition: border-color 0.4s;
  position: relative;
  &:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.095);
  }
  .input-entity {
    height: 30px;
    color: #3d3f3d;
    font-size: 14px;
    line-height: 20px;
    outline: none;
    border: none;
    padding: 0 0px 0 10px;
    box-sizing: border-box;
  }
  .close-box {
    padding: 10px;
    box-sizing: border-box;
    position: absolute;
    right: 0;
    top: 0;
  }

  .input-close {
    position: relative;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #fff;
    vertical-align: middle;
    visibility: hidden;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
    &::before {
      position: absolute;
      content: "";
      width: 10px;
      height: 1px;
      background-color: #333;
      left: 2px;
      top: 6px;
      transform: rotate(45deg);
    }
    &::after {
      position: absolute;
      content: "";
      width: 9px;
      height: 1px;
      background-color: #333;
      right: 3px;
      top: 6px;
      transform: rotate(-45deg);
    }
  }
  .close-show {
    visibility: visible !important;
  }
}
</style>
