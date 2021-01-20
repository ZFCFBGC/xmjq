<template>
  <div class="gqg_home">
    <div class="header">
      <div class="gqg_title">组件自定义封装</div>
      <div class="header_r">
        换肤
        <gqg-theme></gqg-theme>
      </div>
    </div>
  </div>
</template>
<script>
import gqgTheme from "@/components/gqg_theme/gqg_theme.vue";
export default {
  data() {
    return {
      isTheme: true,
    };
  },
  components: {
    gqgTheme,
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.gqg_home {
  .header {
    height: 54px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 16px;
    background: @bg-white;
    .gqg_title {
      line-height: 54px;
      color: @primary;
      font-size: 16px;
    }
    .header_r {
      position: relative;
      width: 100px;
      line-height: 54px;
      color: @primary;
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
