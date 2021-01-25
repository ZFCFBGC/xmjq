<template>
  <div class="gqgSlider" ref="gqgSlider">
    <div class="gqg_slider_runway">
      <div
        class="gqg_slider_button"
        ref="button"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @mousedown="onButtonDown"
      ></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgSlider",
  data() {
    return {
      hovering: false,
      dragging: false,
      isClick: false,
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: null,
    };
  },
  computed: {
    currentPosition() {
      return `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
    },
  },
  methods: {
    handleMouseEnter(event) {
      this.hovering = true;
    },
    handleMouseLeave(event) {
      this.hovering = false;
    },
    onButtonDown(event) {
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener("mousemove", this.onDragging);
      window.addEventListener("mouseup", this.onDragEnd);
    },
    onDragStart(event) {
      console.log("触发了几次");
      this.dragging = true;
      this.isClick = true;
      this.startX = event.clientX;
      // this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },
    onDragging(event) {
      if (this.dragging) {
        this.isClick = false;
        let diff = 0;
        this.currentX = event.clientX;
        diff = this.currentX - this.startX;
        this.newPosition = this.startPosition + diff;
        console.log("数据：", this.newPosition, this.startPosition, diff);
        this.setPosition(this.newPosition);
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

          if (!this.isClick) {
            this.setPosition(this.newPosition);
          }
        }, 0);
        window.removeEventListener("mousemove", this.onDragging);

        window.removeEventListener("mouseup", this.onDragEnd);
      }
    },
    setPosition(newPosition) {
      if (newPosition === null || isNaN(newPosition)) return;
      // if (newPosition < 0) {
      //   newPosition = 0;
      // } else if (newPosition > 100) {
      //   newPosition = 100;
      // }
      console.log(this.$refs);
      this.$refs.button.style.left = newPosition + "px";
      console.log("最终结果：", newPosition);
    },
  },
};
</script>
<style lang="less" scoped>
.gqgSlider {
  position: relative;
  .gqg_slider_runway {
    width: 300px;
    height: 6px;
    margin: 16px 0;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
  }
  .gqg_slider_button {
    width: 16px;
    height: 16px;
    border: 2px solid #409eff;
    background-color: #fff;
    border-radius: 50%;
    transition: 0.2s;
    user-select: none;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0,-50%);
  }
}
</style>
