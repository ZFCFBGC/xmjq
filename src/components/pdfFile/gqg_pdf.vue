<template>
  <div class="pdfFile">
    <div class="fileBoxHeader clearfix">
      <div class="header_l fl">文件预览</div>
      <div class="header_r fr">
        <i class="icon_close" @click="closeFile">×</i>
      </div>
    </div>
    <iframe id="previewPdf" :src="filePath" height="616" width="100%"> </iframe>
    <div class="fileBoxFooter">
      <div class="fr" style="margin-top:6px;">
        <div @click="closeFile" class="closeBtn">关闭</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "gqgPdf",
  props: {
    filePath: {
      type: String,
      default: "",
    },
  },
  created(){

  },
  methods: {
    closeFile(){
      this.$emit("close", false);
    }
  },
};
</script>
<style lang="less" scoped>
.pdfFile {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fefefe;
  width: 80%;
  height: 80%;
  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #dedede;
  border-radius: 5px;
  .fileBoxHeader {
    width: 100%;
    height: 48px;
    line-height: 48px;
    color: #666;
    font-size: 16px;
    border-bottom: 1px solid #dedede;
    margin-bottom: 16px;
    .icon_close {
      display: block;
      width: 14px;
      height: 14px;
      color: #666;
      cursor: pointer;
    }
  }
  .fileBoxFooter {
    height: 48px;
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-top: 1px solid #dedede;
    margin-top: 16px;
    .closeBtn {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      transition: 0.1s;
      font-weight: 500;
      -moz-user-select: no;
      padding: 9px 15px;
      font-size: 12px;
      border-radius: 3px;
      :hover {
        color: #409eff;
        border-color: #c6e2ff;
        background-color: #ecf5ff;
      }
    }
  }
}
</style>
