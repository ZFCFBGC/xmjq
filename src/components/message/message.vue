<template>
  <div class="messageNews" v-show="show">
    <div
      :class="[
        'gqg_message',
        type ? `gqg-message_${type}` : '',
        center ? 'isCenter' : '',
        showClose ? 'isClosable' : '',
      ]"
    >
      <!-- <i class="icon-navigation iconfont"></i> -->
      <slot>
        <p v-html="message" class="gqg_message_content"></p>
      </slot>
      <i
        v-if="showClose"
        class="gqg_message_closeBtn iconfont icon-close"
        @click="close"
      ></i>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgMessage",
  props: {
    show: Boolean,
    type: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    showClose: {
      type: Boolean,
      default: false,
    },
    plain: {
      type: Boolean,
      default: false,
    },
    center: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    console.log("22222222", this.message);
  },
  methods: {
    close() {
      this.show = false;
    },
  },
};
</script>
<style lang="less" scoped>
.messageNews {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translate(-50%, 0);
  .gqg_message {
    height: 46px;
    padding: 11px 24px;
    font-size: 16px;
    line-height: 24px;
    border-radius: 5px;
    box-sizing: border-box;
    background: #edf2fc;
    width: 343px;
    color: #666;
    .gqg_message_content {
      display: inline-block;
      padding-left: 16px;
      color: #666;
    }
    .gqg_message_closeBtn {
      float: right;
      color: #666;
      cursor: pointer;
    }
  }
  .gqg-message_success {
    background: #e1f3d8;
    color: #666;
  }
}
</style>
