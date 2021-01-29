<template>
  <div class="gqgUpload">
    <div class="fileBtn" @click="fileClik">
      <slot></slot>
    </div>
    <slot name="tip"></slot>
    <div class="fileBox">
      <div v-for="(item, index) in fileList" class="fileList" :key="index">
        <span class="gqg_file_name">{{ item.name }}</span>
        <span @click="remove(index)" class="gqg_file_remove">×</span>
      </div>
    </div>
    <input
      style="display:none"
      @change="addFile"
      :multiple="multiple"
      type="file"
      :name="name"
      ref="myUpload"
    />
  </div>
</template>
<script>
import ajax from "./ajax.js";
export default {
  name: "gqgUpload",
  props: {
    limit: {
      type: Number,
      default: 2,
    },
    headers: Object,
    name: {
      type: String,
      default: "file",
    },
    action: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    httpRequest: {
      type: Function,
      defalut: ajax,
    }
  },
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    //调用文件筐的点击事件
    fileClik() {
      this.$refs.myUpload.click();
    },
    //添加文件
    addFile({ target: { files } }) {
      var that = this;
      for (let i = 0, l = files.length; i < l; i++) {
        files[i].url = URL.createObjectURL(files[i]); //创建blob地址，不然图片怎么展示？
        files[i].status = "ready"; //开始想给文件一个字段表示上传进行的步骤的，后面好像也没去用......
      }
      if (that.multiple) {
        that.fileList = [...this.fileList, ...files];
        that.fileList = that.fileList.slice(that.fileList.length - that.limit);
      } else {
        that.fileList = [...files];
      }
    },
    //移除文件
    remove(index) {
      var that = this;
      if (that.fileList.length) {
        that.fileList.splice(index, 1);
      }
    },
    submit() {
      var that = this;
      var options = that.fileList[0];
      const req = this.httpRequest(options);
    },
  },
};
</script>
<style lang="less" scoped>
.gqgUpload {
  width: 360px;
  .fileList {
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
    font-size: 14px;
    color: #606266;
    line-height: 1.8;
    margin-top: 5px;
    position: relative;
    box-sizing: border-box;
    border-radius: 4px;
    width: 100%;
    &:hover {
      background-color: #f5f7fa;
    }
    .gqg_file_name {
      color: #606266;
      display: block;
      margin-right: 40px;
      overflow: hidden;
      padding-left: 4px;
      text-overflow: ellipsis;
      transition: color 0.3s;
      white-space: nowrap;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
    .gqg_file_remove {
      display: block;
      position: absolute;
      right: 5px;
      top: 0;
      line-height: inherit;
      font-size: 14px;
      color: #666;
    }
  }
  .fileList:first-child {
    margin-top: 10px;
  }
}
</style>
