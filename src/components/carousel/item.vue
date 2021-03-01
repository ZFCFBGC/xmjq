<template>
  <div
    class="gqgCarouselItem"
    :class="{
      is_active: active,
      is_in_stage: inStage,
      is_hover: hover,
      is_animating: animating,
    }"
    :style="itemStyle"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "gqgCarouselItem",
  data() {
    return {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false,
    };
  },
  methods: {},
  computed: {
    itemStyle() {
      const translateType = "translateX";
      const value = `${translateType}(${this.translate}px) scale(${this.scale})`;
      const style = {
        transform: value,
      };
      return Tools.autoprefixer(style);
    },
  },
  created() {
    this.$parent && this.$parent.updateItems();
  },
  methods: {
    processIndex(index, activeIndex, length) {
      if (activeIndex === 0 && index === length - 1) {
        return -1;
      } else if (activeIndex === length - 1 && index === 0) {
        return length;
      } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
        return length + 1;
      } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
        return -2;
      }
      return index;
    },
    translateItem(index, activeIndex, oldIndex) {
      const length = this.$parent.items.length;
      if (index !== activeIndex && length > 2 && this.$parent.loop) {
        index = this.processIndex(index, activeIndex, length);
      }

      this.active = index === activeIndex;

      this.translate = this.calcTranslate(index, activeIndex);

      this.ready = true;
    },
    //计算对应item偏移位置
    calcTranslate(index, activeIndex) {
      const distance = this.$parent.$el["offsetWidth"];

      return distance * (index - activeIndex);
    },
  },
  destroyed() {
    this.$parent && this.$parent.updateItems();
  },
};
</script>
<style lang="less" scoped>
.gqgCarouselItem {
  width: 100%;
  height: 100%;
  display: inline-block;
  position: absolute;
  left: 0;
  top: 0;
  &.is_active {
    z-index: 2;
  }
}
.gqgCarouselItem:nth-child(odd){
  background: #d3dce6;
}
.gqgCarouselItem:nth-child(2n){
  background: #99a9bf;
}
</style>
