<template>
  <div class="home">
    <div style="margin-top:100px;">
      <gqg-pop-confirm title="这是一段内容确定删除吗？" :btnShow="false" @confirm="confirm" @cancel="cancel">
        <gqg-button slot="reference">删除</gqg-button>
      </gqg-pop-confirm>
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
        showClose: false,
        type: "success",
      });
    },
    confirm(info){
      console.log('确认：',info)
    },
    cancel(info){
      console.log('取消：',info)
    }
  },
};
</script>
