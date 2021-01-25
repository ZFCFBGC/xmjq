<template>
  <div class="gqgBadge">
    <slot></slot>
    <transition name="gqg_zoom_in_center">
      <sup
        v-show="!hidden && (content || content === 0 || isDot)"
        v-text="content"
        class="gqg_badge_content"
        :class="[
          'el-badge_content_' + type,
          {
            'is-fixed': $slots.default,
            'is-dot': isDot,
          },
        ]"
      >
        >
      </sup>
    </transition>
  </div>
</template>
<script>
export default {
  name: "gqgBadge",
  props: {
    value: [String, Number],
    max: Number,
    isDot: Boolean,
    hidden: Boolean,
    type: {
      type: String,
      defalut: "primary",
    },
  },
  computed: {
    content() {
      if (this.isDot) return;
      const value = this.value;
      const max = this.max;
      if (typeof value === "number" && typeof max === "number") {
        return max < value ? `${max}+` : value;
      }
      return value;
    },
  },
};
</script>
<style lang="less" scoped>
.gqgBadge {
  position: relative;
  vertical-align: middle;
  display: inline-block;
}
.gqg_badge_content {
  background-color: #f56c6c;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  border: 1px solid #fff;
}
.is-fixed {
  position: absolute;
  top: 0;
  right: 10px;
  transform: translateY(-50%) translateX(100%);
}
</style>
