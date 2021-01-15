<template>
  <div class="radio">
    <input
      ref="radio"
      :id="label"
      :disabled="disabled"
      @change="handleChange"
      :name="name"
      type="radio"
      v-model="model"
      :value="label"
    />
    <label :for="label" class="radio-label"><slot></slot></label>
  </div>
</template>

<script>
import emitter from "@/mixins/emitter";
export default {
  name: "radio",
  mixins: [emitter],
  props: {
    value: {
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      default: "",
    },
    name: {
      type: String,
      default: "radioName",
    },
    radio: {
      default: "",
    },
  },
  computed: {
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.componentName !== "RadioGroup") {
          parent = parent.$parent;
        } else {
          this._radioGroup = parent;
          return true;
        }
      }
      return false;
    },
    model: {
      get() {
        return this.isGroup ? this._radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch("RadioGroup", "input", [val]);
        } else {
          this.$emit("input", val);
        }
        this.$refs.radio &&
          (this.$refs.radio.checked = this.model === this.label);
      },
    },
  },
  methods: {
    handleChange() {
      this.$nextTick(() => {
        this.$emit("change", this.model);
        this.isGroup && this.dispatch("RadioGroup", "handleChange", this.model);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.radio {
  margin: 15px;
}
.radio input[type="radio"] {
  position: absolute;
  opacity: 0;
}
.radio input[type="radio"] + .radio-label:before {
  content: "";
  background: #f4f4f4;
  border-radius: 100%;
  border: 1px solid #b4b4b4;
  display: inline-block;
  width: 16px;
  height: 16px;
  position: relative;
  top: 1px;
  margin-right: 15px;
  vertical-align: top;
  cursor: pointer;
  text-align: center;
  -webkit-transition: all 250ms ease;
  transition: all 250ms ease;
}
.radio input[type="radio"]:checked + .radio-label:before {
  background-color: #67b83c;
  box-shadow: inset 0 0 0 4px #f4f4f4;
}
.radio input[type="radio"]:focus + .radio-label:before {
  outline: none;
  border-color: #67b83c;
}
.radio input[type="radio"]:disabled + .radio-label:before {
  box-shadow: inset 0 0 0 4px #f4f4f4;
  border-color: #b4b4b4;
  background: #b4b4b4;
}
.radio input[type="radio"] + .radio-label:empty:before {
  margin-right: 0;
}
</style>
