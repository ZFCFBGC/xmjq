<template>
  <div class="gqgMessageBox" v-if="show">
    <div class="gqgMessageBox_cont">
      <div class="gqgMessageBox_header clearfix">
        <div class="confirmTitle fl" v-if="titleShow">{{ title }}</div>
        <div class="confirmClose fr pointer" @click="cancelClick">
          <i class="icon-close iconfont"></i>
        </div>
      </div>
      <div class="content" v-if="contentShow" v-html="content"></div>
      <div class="btn">
        <div class="confirm pointer" @click="confirmClick">
          {{ confirmTxt }}
        </div>
        <div class="cancel pointer" @click="cancelClick">{{ cancelTxt }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgMessageBox",
  data() {
    return {
      show: false,
      title: "这里是标题",
      titleShow: true,
      content: "这里是内容",
      contentShow: true,
      cancelTxt: "取消",
      confirmTxt: "确认",
    };
  },
  methods: {
    confirmClick() {},
    cancelClick() {},
  },
};
</script>
<style lang="less" scoped>
.gqgMessageBox {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999999999;
  top: 0;
  left: 0;
  position: fixed;
  color: #fff;
  .pointer {
    cursor: pointer;
  }
  .gqgMessageBox_cont {
    height: auto;
    min-width: 240px;
    min-height: 180px;
    padding: 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    border-radius: 8px;
    text-align: center;
    .gqgMessageBox_header {
      height: 18px;
      .confirmTitle {
        height: 18px;
        line-height: 18px;
        color: rgba(24, 38, 60, 1);
        font-size: 14px;
      }
      .confirmClose {
        color: rgba(24, 38, 60, 1);
        font-size: 16px;
      }
    }
    .content {
      padding: 45px 0;
      text-align: center;
      font-size: 13px;
      color: #666;
      line-height: 18px;
      font-size: 14px;
    }
    .btn {
      position: absolute;
      left: 50%;
      bottom: 30px;
      transform: translate(-50%, 0);
      display: flex;
      .confirm {
        width: 76px;
        height: 32px;
        background: rgba(51, 112, 255, 1);
        border-radius: 3px;
        line-height: 32px;
        color: #fff;
        text-align: center;
        font-size: 13px;
        margin-right: 12px;
      }
      .cancel {
        width: 76px;
        height: 32px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(222, 224, 227, 1);
        border-radius: 3px;
        line-height: 32px;
        color: rgba(51, 51, 51, 1);
        text-align: center;
        font-size: 13px;
      }
    }
  }
}
</style>
