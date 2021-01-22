<template>
  <div class="gqgSlider" ref="gqgSlider">
    <div class="gqg_slider_runway">
      <div class="gqg_slider_bar"></div>
      <div class="gqg_slider_button_wrapper">
        <div class="gqg_slider_button"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgSlider",
  data() {
    return {
      startX: 0,
      currentX: 0,
      startY: 0,
      currentY: 0,
    };
  },
  mounted() {
    let that = this;
    let gqgSlider = this.$refs.gqgSlider;
    gqgSlider.addEventListener("touchmove", (e) => {
      //屏幕滑动事件
      let pageX = e.touches[0].pageX - mySliderX; //获取滑动x坐标
      myWidth = (pageX / mySlider.offsetWidth) * 100; //计算百分比
      if (myWidth > 100) {
        //判断不超出范围
        myWidth = 100;
      } else if (myWidth < 0) {
        myWidth = 0;
      }

      if (this.myPosition.isBtn == 1) {
        //判断焦点
        this.myPosition.left = myWidth;
        rightBtn.style.left = myWidth + "%";
      } else if (this.myPosition.isBtn == 2) {
        this.myPosition.right = myWidth;
        leftBtn.style.left = myWidth + "%";
      }
      e.preventDefault();
    });
    gqgSlider.addEventListener("touchstart", (e) => {
      //屏幕触摸事件
      let touchX = e.touches[0].pageX - mySliderX;
      let btnWidth = (leftBtn.offsetWidth / mySlider.offsetWidth / 2) * 100; //计算按钮宽度
      this.myPosition.now = (touchX / mySlider.offsetWidth) * 100;
      mySliderX = elementLeft(mySlider); //滑动块x坐标
      if (
        this.myPosition.now <= this.myPosition.left + btnWidth &&
        this.myPosition.now >= this.myPosition.left - btnWidth
      ) {
        //计算区间 获取焦点
        this.myPosition.isBtn = 1;
      } else if (
        this.myPosition.now <= this.myPosition.right + btnWidth &&
        this.myPosition.now >= this.myPosition.right - btnWidth
      ) {
        this.myPosition.isBtn = 2;
      } else {
        this.myPosition.isBtn = 0;
      }
    });
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.gqgSlider {
  width: 100%;
  .gqg_slider_runway {
    width: 100%;
    height: 6px;
    margin: 16px 0;
    background-color: #e4e7ed;
    border-radius: 3px;
    position: relative;
    cursor: pointer;
    vertical-align: middle;
    .gqg_slider_bar {
      height: 6px;
      background-color: #409eff;
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
      position: absolute;
      width: 100%;
      left: 0%;
    }
    .gqg_slider_button_wrapper {
      height: 36px;
      width: 36px;
      position: absolute;
      z-index: 1001;
      top: -8px;
      transform: translateX(-50%);
      background-color: transparent;
      text-align: center;
      user-select: none;
      line-height: normal;
      left: 100%;
      .gqg_slider_button {
        width: 16px;
        height: 16px;
        border: 2px solid #409eff;
        background-color: #fff;
        border-radius: 50%;
        transition: 0.2s;
        user-select: none;
      }
    }
  }
}
</style>
