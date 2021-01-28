<template>
  <div class="sliderBox">
    <div class="gqgSlider" ref="gqgSlider">
      <div class="gqg_slider_runway" :style="{ width }"></div>
      <div
        class="gqg_slider_button"
        ref="button"
        :style="{ left }"
        @mousedown="onButtonDown"
        @mouseover="mouseOver"
        @mouseleave="mouseLeave"
      >
        <div class="block"></div>
        <div class="toolTips" v-if="isShowToolTips">
          {{ currentX }}
          <div class="triangle"></div>
        </div>
      </div>
    </div>
    <div class="inputBox" v-if="showInput">
      <gqg-input-number
        v-model="currentX"
        :max="max"
        :min="min"
      ></gqg-input-number>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgSlider",
  props: {
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    value: {
      default: "",
    },
    showInput: {
      type: Boolean,
      default: false,
    },
    showTooltip: {
      type: Boolean,
      default: true,
    },
    formatTooltip: Function,
  },
  data() {
    return {
      slider: null,
      currentX: this.value, //当前值
      button: null,
      initWidth: null,
      initDisX: null,
      dragging: false,
      isShowToolTips: false,
    };
  },
  computed: {
    // 换算百分比
    scale() {
      return (this.currentX - this.min) / (this.max - this.min);
    },
    // 设置runway的宽度
    width() {
      if (this.slider) {
        return this.slider.offsetWidth * this.scale + "px";
      } else {
        return 0 + "px";
      }
    },
    //按钮偏移量（计算按钮的位置）
    left() {
      if (this.slider) {
        return (
          this.slider.offsetWidth * this.scale -
          this.button.offsetWidth / 2 +
          "px"
        );
      } else {
        return 0 + "px";
      }
    },
  },
  mounted() {
    this.slider = this.$refs.gqgSlider;
    this.button = this.$refs.button;
  },
  methods: {
    onButtonDown(event) {
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener("mousemove", this.onDragging);
      window.addEventListener("mouseup", this.onDragEnd);
    },
    //记录按下的初始值，打开滑动的控制开关
    onDragStart(event) {
      var that = this;
      that.initWidth = parseInt(that.width);
      that.initDisX = event.clientX;
      this.dragging = true;
    },
    onDragging(event) {
      var that = this;
      if (this.dragging) {
        // 拖拽的时候获取的新width
        var newWidth = event.clientX - that.initDisX + that.initWidth;
        // 拖拽的时候得到新的百分比
        var scale = newWidth / that.slider.offsetWidth;
        that.currentX = Math.ceil((that.max - that.min) * scale + that.min);
        that.currentX = Math.max(that.currentX, that.min);
        that.currentX = Math.min(that.currentX, that.max);
      }
    },
    onDragEnd() {
      if (this.dragging) {
        /*
         * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
         * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
         */

        setTimeout(() => {
          this.dragging = false;
        }, 0);
        this.$nextTick(() => {
          this.$emit("change", this.currentX);
        });
        window.removeEventListener("mousemove", this.onDragging);
        window.removeEventListener("mouseup", this.onDragEnd);
      }
    },
    mouseOver() {
      if (this.showTooltip) {
        this.isShowToolTips = true;
      } else {
        this.isShowToolTips = false;
      }
    },
    mouseLeave() {
      this.isShowToolTips = false;
    },
  },
};
</script>
<style lang="less" scoped>
.sliderBox {
  display: flex;
  .inputBox {
    margin-left: 24px;
  }
}
.gqgSlider {
  position: relative;
  margin: 16px 0;
  width: 400px;
  height: 6px;
  background: #e4e7ed;
  border-radius: 5px;
  cursor: pointer;
  .gqg_slider_runway {
    position: absolute;
    left: 0;
    top: 0;
    width: 112px;
    height: 6px;
    border-radius: 5px;
    background: #409eff;
  }
  .gqg_slider_button {
    position: absolute;
    left: 100px;
    top: -6px;
    width: 20px;
    height: 20px;
    .toolTips {
      position: absolute;
      padding: 12px;
      line-height: 16px;
      text-align: center;
      background: #303133;
      color: #fff;
      border-radius: 5px;
      left: -14px;
      top: -54px;
      .triangle {
        position: absolute;
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid #303133;
        border-radius: 3px;
        left: 50%;
        transform: translate(-50%, 0);
        bottom: -9px;
      }
    }
  }
  .block {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid #409eff;
    background: rgba(255, 255, 255, 1);
    transition: 0.2s all;
  }
  .block:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
}
</style>
