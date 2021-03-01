<template>
  <div
    class="gqgCarousel"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave"
  >
    <div class="gqgCarousel_cont" :style="{ height: height }">
      <transition v-if="arrowDisplay" name="carousel_arrow_left">
        <div
          class="carousel_arrow_left"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
        >
          <i class="icon-arrow-left-bold iconfont"></i>
        </div>
      </transition>
      <transition v-if="arrowDisplay" name="carousel_arrow_right">
        <div
          class="carousel_arrow_right"
          v-show="
            (arrow === 'always' || hover) &&
              (loop || activeIndex < items.length - 1)
          "
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
        >
          <i class="icon-arrow-right-bold iconfont"></i>
        </div>
      </transition>
      <slot></slot>
    </div>
    <div class="gqgindicators">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel_indicator"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)"
      >
        <span
          :class="[
            'carousel_indicator_' + direction,
            { isActive: index === activeIndex },
          ]"
        ></span>
      </div>
    </div>
  </div>
</template>
<script>
import { throttle } from "throttle-debounce";
export default {
  name: "gqgCarousel",
  props: {
    height: {
      type: String,
      default: "150px",
    },
    trigger: {
      type: String,
      default: "hover",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: 3000,
    },
    initialIndex: {
      type: Number,
      default: 0,
    },
    arrow: {
      type: String,
      default: "hover",
    },
    direction: {
      type: String,
      default: "line",
    },
  },
  watch: {
    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      if (oldVal > -1) {
        this.$emit("change", val, oldVal);
      }
    },
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },
    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },
  },
  computed: {
    arrowDisplay() {
      return this.arrow !== "never";
    },
  },
  data() {
    return {
      activeIndex: -1,
      translate: 0,
      scale: 1,
      timer: null,
      items: [],
      hover: false,
    };
  },
  created() {
    this.throttledArrowClick = throttle(300, true, (index) => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, (index) => {
      this.handleIndicatorHover(index);
    });
  },
  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      this.startTimer();
    });
  },
  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },
    //轮播图开始
    startTimer() {
      var that = this;
      if (that.timer) {
        window.clearInterval(that.timer);
        that.timer = null;
      }
      that.timer = window.setInterval(() => {
        that.playSlides();
      }, that.interval);
    },
    //不是自动轮播时，清除定时器
    pauseTimer() {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
    //计算索引
    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },
    //获取轮播图list
    updateItems() {
      this.items = this.$children.filter(
        (child) => child.$options.name === "gqgCarouselItem"
      );
    },
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },
    //重新设置选中的索引
    setActiveItem(index) {
      if (typeof index === "string") {
        const filteredItems = this.items.filter((item) => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        console.warn("[Element Warn][Carousel]index must be an integer.");
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },
    //指示器点击事件
    handleIndicatorClick(index) {
      this.activeIndex = index;
    },
    //鼠标hover在指示器
    handleIndicatorHover(index) {
      if (this.trigger === "hover" && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    },
    //按钮鼠标移入
    handleButtonEnter(arrow) {
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },
    itemInStage(item, index) {
      const length = this.items.length;
      if (
        (index === length - 1 && item.inStage && this.items[0].active) ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)
      ) {
        return "left";
      } else if (
        (index === 0 && item.inStage && this.items[length - 1].active) ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)
      ) {
        return "right";
      }
      return false;
    },
    //按钮鼠标移出
    handleButtonLeave() {
      if (this.direction === "vertical") return;
      this.items.forEach((item) => {
        item.hover = false;
      });
    },
  },
  beforeDestroy() {
    var that = this;
    if (that.timer) {
      window.clearInterval(that.timer);
      that.timer = null;
    }
  },
};
</script>
<style lang="less" scoped>
.gqgCarousel {
  width: 100%;
  position: relative;
  .gqgCarousel_cont {
    width: 100%;
    position: relative;
    overflow: hidden;
    .carousel_arrow_left {
      width: 36px;
      height: 36px;
      cursor: pointer;
      transition-duration: 0.3s;
      border-radius: 50%;
      background: rgba(31, 45, 61, 0.31);
      color: #fff;
      z-index: 10;
      text-align: center;
      line-height: 36px;
      font-size: 12px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      left: 16px;
    }
    .carousel_arrow_left:hover{
      background: rgba(31,45,61,.23);
    }
    .carousel_arrow_right {
      width: 36px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      transition-duration: 0.3s;
      border-radius: 50%;
      background: rgba(31, 45, 61, 0.31);
      color: #fff;
      z-index: 10;
      text-align: center;
      font-size: 12px;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 16px;
    }
    .carousel_arrow_right:hover{
      background: rgba(31,45,61,.23);
    }
  }
  .gqgindicators {
    position: absolute;
    width: 100%;
    text-align: center;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    z-index: 10;
  }
  .carousel_indicator {
    display: inline-block;
    padding: 12px 4px;
    background-color: transparent;
    cursor: pointer;
    .carousel_indicator_line {
      display: block;
      opacity: 0.48;
      width: 30px;
      height: 2px;
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: 0.3s;
      &.isActive {
         background-color: #fff;
      }
    }
    .carousel_indicator_cricle {
      display: block;
      width: 14px;
      height: 14px;
      background-color: rgba(0, 0, 0, 0.2);
      cursor: pointer;
      transition: 0.3s;
      border-radius: 50%;
      &.isActive {
        background-color: #fff;
      }
    }
  }
}
</style>
