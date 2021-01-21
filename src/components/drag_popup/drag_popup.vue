<template>
  <div class="dragPop" v-if="isDragShow">
    <div class="dragHeader">
      <div class="dragTitle">{{ title }}</div>
      <div class="dragClose" @click="dragClose">×</div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "dragPopup",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isDragShow: true,
    };
  },
  methods: {
    dragClose() {
      this.isDragShow = false;
      this.$emit("close");
    },
  },
};
</script>
<style lang="less" scoped>
.dragPop {
  cursor: pointer;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  border: 1px solid#E7E7E7;
  border-radius: 5px;
  background: #fff;
  z-index: 999;
  .dragHeader {
    height: 44px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 0 16px;
    .dragTitle {
      line-height: 44px;
      color: #333;
      font-size: 16px;
    }
    .dragClose {
      position: relative;
      line-height: 44px;
      color: #333;
      font-size: 16px;
      text-align: center;
    }
  }
  .content {
    max-height: 600px;
    overflow-y: auto;
    padding-bottom: 32px;
  }
}
</style>
