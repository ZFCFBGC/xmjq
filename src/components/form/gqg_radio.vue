<template>
  <div class="radio">
    <input
      :id="label"
      :disabled="disabled"
      @change="handleChange"
      name="radio"
      type="radio"
      :checked="checked"
      :value="label"
      @click="checkRadio($event)"
    />
    <label :for="label" class="radio-label"><slot></slot></label>
  </div>
</template>

<script>
export default {
  name: "radio",
  props: {
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
    toggleRadio: {
      type: Boolean,
      default: false,
    },
  },
  model: {
    prop: "radio",
    event: "change",
  },
  watch: {
    radio(newVal) {
      if (newVal == this.label) {
        this.checked = true;
      }
    },
  },
  data() {
    return {
      checked: false,
    };
  },
  created() {
    if (this.radio == this.label) {
      this.checked = true;
    }
  },
  methods: {
    checkRadio($event) {
      console.log("$event", $event);
      if (this.toggleRadio) {
        
      } else {
        return;
      }
    },
    handleChange(e) {
      this.$emit("change", e.target.value);
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
