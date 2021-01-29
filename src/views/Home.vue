<template>
  <div class="home">
    <div style="margin:100px;">
      <gqg-upload :httpRequest="myUpload" ref="upload" action="">
        <gqg-button type="primary">上传文件</gqg-button>
        <div slot="tip" class="gqg_upload_tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </gqg-upload>
      <gqg-button @click="confirmSubmit">确认上传</gqg-button>
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
  },
};
</script>
