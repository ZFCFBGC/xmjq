<template>
  <div class="home">
    <div>
      <gqg-upload :httpRequest="myUpload" ref="upload" action="">
        <gqg-button type="primary">上传文件</gqg-button>
      </gqg-upload>
    </div>
    <div class="box" ref="box"></div>
    <div>
      <gqg-button type="primary" @click="clickBtn">message</gqg-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swicthVal: true,
      per: 50,
      num: 1,
    };
  },
  created() {},
  mounted() {
    var that = this;
    // this.$gqgLoading.show({
    //   text: "测试",
    // });
    // setTimeout(function() {
    //   that.$gqgLoading.hide();
    // }, 3000);
  },
  methods: {
    myUpload(file) {
      var that = this;
      console.log("file", file);
      let formData = new FormData();
      formData.append("file", file);
      that.$client
        .upload({
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          method: "post",
          url: "",
          data: formData,
        })
        .then((res) => {})
        .catch((error) => {});
    },
    confirmSubmit() {
      this.$refs.upload.submit();
    },
    clickBtn() {
      this.$gqgMessage.show({
        message: "消息提示",
        showClose:true,
        type:'success'
      });
    },
  },
};
</script>
