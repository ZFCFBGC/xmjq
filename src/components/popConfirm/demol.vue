<template>
  <div style="position:relative">
    <span ref="trigger">
      <slot></slot>
    </span>
    <div
      class="tooltip"
      v-bind:class="{
        visible: show === true,
      }"
      ref="popover"
      role="tooltip"
    >
      <div class="tooltip-inner">
        <slot name="content" v-html="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import EventListener from "../utils/EventListener";
export default {
  name: "Tooltip",
  props: {
    trigger: {
      type: String,
      default: "hover",
    },
    content: String,
    placement: String,
    width: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      position: {
        top: 0,
        left: 0,
      },
      show: true,
      showFlag: false, // 用于判断延迟关闭
    };
  },
  watch: {
    show: function(val) {
      if (val) {
        const popover = this.$refs.popover;
        const triger = this.$refs.trigger.children[0];
        switch (this.placement) {
          case "top":
            this.position.left =
              triger.offsetLeft -
              popover.offsetWidth / 2 +
              triger.offsetWidth / 2;
            this.position.top = triger.offsetTop - popover.offsetHeight - 5;
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
            this.position.top = triger.offsetTop + triger.offsetHeight + 5;
            break;
        }
        popover.style.top = this.position.top + "px";
        popover.style.left = this.position.left + "px";
      }
    },
  },
  methods: {
    toggle() {
      this.show = !this.show;
    },
  },
  mounted() {
    if (!this.$refs.popover) {
      return console.error(
        "Could not fid popover ref in your component that uses popoverMixin"
      );
    }
    // 获取监听对象
    const triger = this.$refs.trigger.children[0];
    const popover = this.$refs.popover;
    // 根据trigger监听特定事件
    if (this.trigger === "hover") {
      this._mouseenterEvent = EventListener.listen(triger, "mouseenter", () => {
        this.show = true;
        this.showFlag = true;
      });
      this._mouseleaveEvent = EventListener.listen(triger, "mouseleave", () => {
        this.showFlag = false;
        setTimeout(() => {
          if (!this.showFlag) {
            this.show = false;
          }
        }, 1000);
      });
      this._mouseenterEvent1 = EventListener.listen(
        popover,
        "mouseenter",
        () => {
          this.show = true;
          this.showFlag = true;
        }
      );
      this._mouseleaveEvent1 = EventListener.listen(
        popover,
        "mouseleave",
        () => {
          this.showFlag = false;
          setTimeout(() => {
            if (!this.showFlag) {
              this.show = false;
            }
          }, 1000);
        }
      );
    } else if (this.trigger === "focus") {
      this._focusEvent = EventListener.listen(triger, "focus", () => {
        this.show = true;
      });
      this._blurEvent = EventListener.listen(triger, "blur", () => {
        this.show = false;
      });
    } else {
      this._clickEvent = EventListener.listen(triger, "click", this.toggle);
    }
    this.show = !this.show;
  },
  // 在组件销毁前移除监听，释放内存
  beforeDestroy() {
    if (this._blurEvent) {
      this._blurEvent.remove();
      this._focusEvent.remove();
    }
    if (this._mouseenterEvent) {
      this._mouseenterEvent.remove();
      this._mouseleaveEvent.remove();
      this._mouseenterEvent1.remove();
      this._mouseenterEvent2.remove();
    }
    if (this._clickEvent) {
      this._clickEvent.remove();
    }
  },
};
</script>
<style lang="less">
.tooltip {
  max-width: 500px;
  min-width: 100px;
  position: absolute;
  visibility: hidden;
  border: 1px solid #aaa;
  background: #fff;
  z-index: 2;
  &.visible {
    visibility: visible;
  }
}
</style>
