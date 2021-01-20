<template>
  <div class="themePell">
    <div
      :class="['themeList', isActive == 'A' && 'active']"
      @click="changeTheme('A')"
    >
      主题A
    </div>
    <div
      :class="['themeList', isActive == 'B' && 'active']"
      @click="changeTheme('B')"
    >
      主题B
    </div>
    <div
      :class="['themeList', isActive == 'C' && 'active']"
      @click="changeTheme('C')"
    >
      主题C
    </div>
    <div
      :class="['themeList', isActive == 'D' && 'active']"
      @click="changeTheme('D')"
    >
      主题D
    </div>
  </div>
</template>
<script>
import { menuTheme } from "@/assets/js/theme.js";
export default {
  data() {
    return {
      isActive: "A",
    };
  },
  mounted() {
    console.log("1111111", menuTheme);
  },
  methods: {
    changeTheme(type) {
      var that = this;
      if (type == "A") {
        that.isActive = "A";
        that.changeStyle(menuTheme.themeA);
      } else if (type == "B") {
        that.isActive = "B";
        that.changeStyle(menuTheme.themeB);
      } else if (type == "C") {
        that.isActive = "C";
        that.changeStyle(menuTheme.themeC);
      } else if (type == "D") {
        that.isActive = "D";
        that.changeStyle(menuTheme.themeD);
      }
    },
    changeStyle: (obj) => {
      for (let key in obj) {
        document
          .getElementsByTagName("body")[0]
          .style.setProperty(`--${key}`, obj[key]);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.themePell {
  position: absolute;
  right: 0;
  top: 54px;
  border: 1px solid @title-border;
  width: 100px;
  border-radius: 5px;
  .themeList {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-size: 14px;
    color: @title;
  }
  .active{
     color: @order-active;
  }
}
</style>
