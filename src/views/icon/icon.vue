<template>
  <div class="gqgIcon">
    <div class="gqgIconTitle">Icon图标列表</div>
    <div class="iconBox">
      <div class="iconList" v-for="(item, idx) in iconArr" :key="idx">
        <div class="iconList_top">
          <i class="iconfont" :class="item.class"></i>
        </div>
        <div class="iconList_footer">
          {{ item.label }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import iconData from "@/assets/js/icon.js";
export default {
  data() {
    return {
      iconArr: [],
    };
  },
  created() {
    console.log("图标数据:", iconData);
    this.iconArr = iconData.iconArr;
  },
};
</script>
<style lang="less" scoped>
.gqgIcon {
  width: 100%;
  background: #fff;
  .gqgIconTitle {
    padding: 16px 0;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
  }
  .iconBox {
    
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;
    box-sizing: border-box;
    -webkit-user-select: auto;
    -moz-user-select: auto;
    -ms-user-select: auto;
    user-select: auto;
    .iconList {
      float: left;
      width: 16.66%;
      text-align: center;
      height: 120px;
      color: #666;
      font-size: 13px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      margin-right: -1px;
      margin-bottom: -1px;
      box-sizing: border-box;
      &:hover{
        color: #5cb6ff;
      }
      .iconList_top {
        line-height: 60px;
        font-size:18px;
      }
      .iconList_footer {
        line-height: 36px;
        font-size:16px;
      }
    }
  }
}
</style>
