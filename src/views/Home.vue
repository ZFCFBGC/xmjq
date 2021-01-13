<template>
  <div class="home">
    <div class="demol">功能测试</div>
    <div>
      <gqg-input
        v-model="username"
        placeholder="请输入用户名"
        @input="getNewVal"
        width="220px"
        clearable
      ></gqg-input>
    </div>
    <div>
      <gqg-radio v-model="gqg" :label="1" @change="getChange">男</gqg-radio>
      <gqg-radio v-model="gqg" :label="2" @change="getChange">女</gqg-radio>
    </div>
    <div v-if="isFileShow">
      <gqg-pdf :filePath="filePath" @close="getClose"></gqg-pdf>
    </div>
  </div>
</template>
<script>
import gqgInput from "@/components/form/gqg_input.vue";
import gqgPdf from "@/components/pdfFile/gqg_pdf.vue";
import gqgRadio from "@/components/form/gqg_radio.vue";
export default {
  data() {
    return {
      username: "郭启庚",
      isFileShow: true,
      filePath: "",
      gqg: 2,
      options: [
        {
          label: "gqg",
          value: 1,
        },
        {
          label: "mwc",
          value: 2,
        },
      ],
    };
  },
  components: {
    gqgInput,
    gqgPdf,
    gqgRadio,
  },
  created() {
    this.filePath =
      "../../../pdf/web/viewer.html?file=../../../file/新疆兵团监管平台测试安全报告.pdf";
  },
  methods: {
    getNewVal(val) {
      console.log("333", val, this.username);
    },
    getClose(val) {
      this.isFileShow = false;
    },
    getChange(val) {
      console.log("单选框", this.gqg);
    },
  },
};
</script>
