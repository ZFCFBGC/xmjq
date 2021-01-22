<template>
  <div
    class="gqg_button"
    :style="'width:' + width + 'px;'"
    @click="clickBtn"
    :class="[
      type ? 'gqg_button_' + type : '',
      {
        isDisabled: disabled,
        isRound: round,
      },
    ]"
  >
    <span>
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "gqgButton",
  props: {
    width: {
      type: [String, Number],
      default: "100",
    },
    type: {
      type: String,
      default: "default",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
  },
  methods:{
    clickBtn(){
      this.$emit("click");
    }
  }
};
</script>
<style lang="less" scoped>
.gqg_button {
  display: inline-block;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  transition: 0.1s;
  font-weight: 500;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.gqg_button:hover {
  color: #409eff;
  border-color: #c6e2ff;
  background-color: #ecf5ff;
}

.gqg_button_primary {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.gqg_button_primary:hover {
  background: #66b1ff;
  border-color: #66b1ff;
  color: #fff;
}
.gqg_button_success {
  color: #fff;
  background-color: #67c23a;
  border-color: #67c23a;
}
.gqg_button_success:hover {
  background: #85ce61;
  border-color: #85ce61;
  color: #fff;
}
.gqg_button_warning {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
}
.gqg_button_warning:hover {
  background: #ebb563;
  border-color: #ebb563;
  color: #fff;
}
.gqg_button_error {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
.gqg_button_error:hover {
  background: #f78989;
  border-color: #f78989;
  color: #fff;
}
.isRound{
  border-radius: 20px;
}
.isDisabled {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
.isDisabled:hover {
  color: #c0c4cc;
  cursor: not-allowed;
  background-image: none;
  background-color: #fff;
  border-color: #ebeef5;
}
</style>
