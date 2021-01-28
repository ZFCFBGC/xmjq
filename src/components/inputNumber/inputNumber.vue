<template>
  <div class="inputNumber" :style="{ width }">
    <div
      class="gqg_input_number_decrease"
      :class="{ is_disabled: minDisabled }"
      @click="decrease"
    >
      -
    </div>
    <div class="inputShuru">
      <input
        v-model="inputVal"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keyup="inputChange"
        type="text"
        class="input-entity"
        ref="input"
      />
    </div>

    <div
      class="gqg_input_number_increase"
      :class="{ is_disabled: maxDisabled }"
      @click="increase"
    >
      +
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgInputNumber",
  props: {
    val: {
      default: "",
    },
    width: {
      type: String,
      default: "142px",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  watch: {
    val(newVal) {
      this.inputVal = newVal;
    },
  },
  computed: {
    minDisabled() {
      return this.inputVal <= this.min ? true : false;
    },
    maxDisabled() {
      return this.inputVal >= this.max ? true : false;
    },
    inputwidth() {
      return "60px";
    },
  },
  model: {
    prop: "val",
    event: "change",
  },
  data() {
    return {
      inputVal: this.val,
    };
  },
  methods: {
    handleInput() {
      this.$emit("change", this.inputVal);
    },
    handleFocus() {
      this.$emit("focus", this.inputVal);
    },
    handleBlur() {
      this.$emit("blur", this.inputVal);
    },
    increase() {
      var that = this;
      var newVal = this.inputVal + this.step;
      that.setCurrentValue(newVal);
    },
    decrease() {
      var that = this;
      var newVal = this.inputVal - this.step;
      that.setCurrentValue(newVal);
    },
    setCurrentValue(newVal) {
      const oldVal = this.inputVal;
      if (newVal >= this.max) {
        newVal = this.max;
      }
      if (newVal <= this.min) {
        newVal = this.min;
      }
      if (oldVal === newVal) {
        return;
      }
      this.inputVal = newVal;
      this.$emit("change", this.inputVal);
    },
    inputChange() {
      //输入框值改变
      this.inputVal = Number(this.inputVal.replace(/[^\d]/g,''));
      this.$emit("change", this.inputVal);
    },
  },
};
</script>
<style lang="less" scoped>
.inputNumber {
  position: relative;
  height: 36px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  border-radius: 5px;
  &:hover {
    border: 1px solid #409eff;
  }
  .gqg_input_number_decrease {
    display: inline-block;
    border-radius: 4px 0 0 4px;
    border-right: 1px solid #dcdfe6;
    z-index: 1;
    line-height: 34px;
    width: 40px;
    height: 34px;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .inputShuru {
    display: inline-block;
    height: 36px;
    text-align: center;
    width: 60px;
    .input-entity {
      text-align: center;
      width: 60px;
      height: 30px;
      color: #3d3f3d;
      font-size: 14px;
      line-height: 20px;
      outline: none;
      border: none;
      padding: 0 0px 0 10px;
      box-sizing: border-box;
    }
  }
  .gqg_input_number_increase {
    display: inline-block;
    border-radius: 4px 0 0 4px;
    border-left: 1px solid #dcdfe6;
    z-index: 1;
    line-height: 34px;
    width: 40px;
    height: 34px;
    text-align: center;
    background: #f5f7fa;
    color: #606266;
    cursor: pointer;
    font-size: 14px;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .is_disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
</style>
