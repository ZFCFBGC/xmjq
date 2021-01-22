<template>
  <div
    class="gqgSwitch"
    :class="{ is_disabled: switchDisabled, is_checked: isChecked }"
    @click.prevent="switchValue"
  >
    <span
      v-if="inactiveText"
      :class="[
        'gqg_switch_label',
        'gqg_switch_label_left',
        !isChecked ? 'is_active' : '',
      ]"
      >{{ inactiveText }}</span
    >
    <span class="gqg_switch_core"></span>
    <span
      v-if="activeText"
      :class="[
        'gqg_switch_label',
        'gqg_switch_label_right',
        isChecked ? 'is_active' : '',
      ]"
      >{{ activeText }}</span
    >
  </div>
</template>
<script>
export default {
  name: "gqgSwitch",
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    activeText: String,
    inactiveText: String,
  },
  computed: {
    switchDisabled() {
      return this.disabled;
    },
  },
  //model中prop接受v-model传递的值
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    value(val) {
      this.isChecked = val;
    },
    isChecked(val) {
      this.$emit("change", val);
    },
  },
  data() {
    return {
      isChecked: this.value,
    };
  },
  methods: {
    switchValue() {
      !this.switchDisabled && this.handleChange();
    },
    handleChange(event) {
      this.isChecked = !this.isChecked;
    },
  },
};
</script>
<style lang="less" scoped>
.gqgSwitch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: 14px;
  line-height: 20px;
  height: 20px;
  vertical-align: middle;
}
.gqg_switch_core {
  margin: 0;
  display: inline-block;
  position: relative;
  width: 40px;
  height: 20px;
  border: 1px solid #dcdfe6;
  outline: none;
  border-radius: 10px;
  box-sizing: border-box;
  background: #dcdfe6;
  cursor: pointer;
  transition: border-color 0.3s, background-color 0.3s;
  vertical-align: middle;
}
.gqg_switch_core:after {
  content: "";
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 100%;
  transition: all 0.3s;
  width: 16px;
  height: 16px;
  background-color: #fff;
}
.is_checked .gqg_switch_core {
  width: 40px;
  border-color: rgb(19, 206, 102);
  background-color: rgb(19, 206, 102);
}
.is_checked .gqg_switch_core:after {
  left: 100%;
  margin-left: -17px;
}
.is_disabled {
  opacity: 0.6;
  .gqg_switch_core {
    cursor: not-allowed;
  }
}
.gqg_switch_label {
  transition: 0.2s;
  height: 20px;
  display: inline-block;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  cursor: pointer;
  vertical-align: middle;
  color: #303133;
}
.gqg_switch_label_left{
  margin-right:12px;
}
.gqg_switch_label_right{
  margin-left:12px;
}
.is_active{
  color:#409eff;
}
</style>
