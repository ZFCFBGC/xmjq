<template>
  <div class="popConfirmBox">
    <div
      class="popConfirm"
      :class="{
        visible: show === true,
      }"
      ref="popover"
    >
      <div :class="'popper_arrow_' + placement"></div>
      <div class="content">{{ title }}</div>
      <div class="popBtn" v-if="btnShow">
        <div class="cancel" @click="cancel">
          {{ cancelBtnTxt }}
        </div>
        <div class="confirm" @click="confirm">
          {{ confirmBtnTxt }}
        </div>
      </div>
    </div>
    <span class="popover_reference_wrapper" ref="wrapper">
      <slot name="reference"></slot>
    </span>
  </div>
</template>
<script>
import { on, off } from "@/assets/js/dom.js";
export default {
  name: "gqgPopConfirm",
  props: {
    trigger: {
      type: String,
      default: "click",
    },
    content: String,
    placement: {
      type: String,
      default: "bottom",
    },
    width: {
      type: Number,
      default: 200,
    },
    confirmBtnTxt: {
      type: String,
      default: "好的",
    },
    cancelBtnTxt: {
      type: String,
      default: "不用了",
    },
    btnShow:{
      type:Boolean,
      default: true,
    },
    title: String,
  },
  watch: {
    show: function(val) {
      if (val) {
        const popover = this.$refs.popover;
        const triger = this.$refs.wrapper.children[0];
        switch (this.placement) {
          case "top":
            this.position.left =
              triger.offsetLeft -
              popover.offsetWidth / 2 +
              triger.offsetWidth / 2;
            this.position.top = triger.offsetTop - popover.offsetHeight - 9;
            break;
          case "left":
            console.log("width:", popover.offsetWidth);
            this.position.left = triger.offsetLeft - popover.offsetWidth - 5;
            this.position.top =
              triger.offsetTop +
              triger.offsetHeight / 2 -
              popover.offsetHeight / 2;
            break;
          case "right":
            this.position.left = triger.offsetLeft + triger.offsetWidth + 5;
            this.position.top =
              triger.offsetTop +
              triger.offsetHeight / 2 -
              popover.offsetHeight / 2;
            break;
          case "bottom":
            this.position.left =
              triger.offsetLeft -
              popover.offsetWidth / 2 +
              triger.offsetWidth / 2;
            this.position.top = triger.offsetTop + triger.offsetHeight + 9;
            break;
        }
        popover.style.top = this.position.top + "px";
        popover.style.left = this.position.left + "px";
        var aaa = window.Tools.getRect(popover);
        console.log("aaaaaa:", aaa);
      }
    },
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0,
      },
      show: false,
      showFlag: false, // 用于判断延迟关闭
    };
  },
  mounted() {
    var that = this;
    if (!this.$refs.popover) {
      return console.error(
        "Could not fid popover ref in your component that uses popoverMixin"
      );
    }
    // 获取监听对象
    const triger = this.$refs.wrapper.children[0];
    const popover = this.$refs.popover;
    // 根据trigger监听特定事件
    if (this.trigger === "hover") {
      this._mouseenterEvent = on(triger, "mouseenter", () => {
        this.show = true;
        this.showFlag = true;
      });
      this._mouseleaveEvent = on(triger, "mouseleave", () => {
        this.showFlag = false;
        setTimeout(() => {
          if (!this.showFlag) {
            this.show = false;
          }
        }, 1000);
      });
      this._mouseenterEvent1 = on(popover, "mouseenter", () => {
        this.show = true;
        this.showFlag = true;
      });
      this._mouseleaveEvent1 = on(popover, "mouseleave", () => {
        this.showFlag = false;
        setTimeout(() => {
          if (!this.showFlag) {
            this.show = false;
          }
        }, 1000);
      });
    } else if (this.trigger === "focus") {
      this._focusEvent = on(triger, "focus", () => {
        this.show = true;
      });
      this._blurEvent = on(triger, "blur", () => {
        this.show = false;
      });
    } else {
      this._clickEvent = on(triger, "click", this.toggle);
    }
  },
  methods: {
    toggle() {
      console.log("进来了吗");
      this.show = !this.show;
    },
    cancel() {
      this.show = false;
      this.$emit("cancel", false);
    },
    confirm() {
      this.show = false;
      this.$emit("confirm", true);
    },
  },

  beforeDestroy() {
    const triger = this.$refs.wrapper.children[0];
    off(triger, "mouseenter", () => {
      this.show = true;
      this.showFlag = true;
    });
    off(triger, "mouseleave", () => {
      this.showFlag = false;
      setTimeout(() => {
        if (!this.showFlag) {
          this.show = false;
        }
      }, 1000);
    });
    off(triger, "focus", () => {
      this.show = true;
    });
    off(triger, "blur", () => {
      this.show = false;
    });
    off(triger, "click", this.toggle);
  },
};
</script>
<style lang="less" scoped>
.popConfirm {
  position: absolute;
  background: #fff;
  min-width: 150px;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  padding: 12px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  word-break: break-all;
  transform-origin: center top;
  visibility: hidden;
  z-index: 2144;
  &.visible {
    visibility: visible;
  }
  .content {
    color: #606266;
    line-height: 1.4;
    text-align: justify;
    font-size: 14px;
    word-break: break-all;
    margin: 14px 0;
  }
  .popBtn {
    text-align: right;
    margin: 0;
    .cancel,
    .confirm {
      display: inline-block;
    }
    .cancel {
      color: #409eff;
      padding: 7px 15px;
      font-size: 12px;
      border-radius: 3px;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
    }
    .confirm {
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      border: 1px solid #dcdfe6;
      padding: 7px 15px;
      font-size: 12px;
      border-radius: 3px;
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
      margin-left: 10px;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
    }
  }
}
.popper_arrow_top {
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #fff;
  -webkit-transform: rotate(180deg);
  -moz-transform: rotate(180deg);
  -o-transform: rotate(180deg);
  -ms-transform: rotate(180deg);
  transform: rotate(180deg);
}
.popper_arrow_bottom {
  position: absolute;
  top: -6px;
  left: 50%;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
  filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
  margin-right: 3px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
</style>
