<template>
  <div class="home">
    <div class="demol">功能测试</div>
    <div>
      <gqg-form :model="form" :rules="rules">
        <gqg-form-item label="用户名：" prop="userName">
          <gqg-input v-model="form.userName"></gqg-input>
        </gqg-form-item>
        <gqg-form-item label="密码：" prop="passWord">
          <gqg-input v-model="form.passWord"></gqg-input>
        </gqg-form-item>
      </gqg-form>
    </div>
  </div>
</template>
<script>
import gqgInput from "@/components/form/gqg_input.vue";
import gqgPdf from "@/components/pdfFile/gqg_pdf.vue";
import gqgRadio from "@/components/form/gqg_radio.vue";
import gqgCheckbox from "@/components/form/gqg_checkBox.vue";
import gqgSelect from "@/components/form/gqg_select.vue";
import gqgForm from "@/components/gqg_form/gqg_form.vue";
import gqgFormItem from "@/components/gqg_form_item/gqg_form_item.vue";

export default {
  data() {
    return {
      form: {
        userName: "",
        passWord: "",
      },
      rules: {
        userName: [{ required: true, message: "不能为空", trigger: "blur" }],
        passWord: [{ required: true, message: "不能为空", trigger: "blur" }],
      },
    };
  },
  components: {
    gqgInput,
    gqgPdf,
    gqgRadio,
    gqgCheckbox,
    gqgSelect,
    gqgForm,
    gqgFormItem,
  },
  created() {},
  methods: {},
};
</script>
