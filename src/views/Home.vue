<template>
  <div class="home">
    <div class="demol">功能测试</div>
    <div>
      <gqg-form :model="form" :rules="rules">
        <gqg-form-item label="用户名：" prop="userName">
          <gqg-input v-model="form.userName"></gqg-input>
        </gqg-form-item>
        <gqg-form-item label="邮箱：" prop="email">
          <gqg-input v-model="form.email"></gqg-input>
        </gqg-form-item>
      </gqg-form>
    </div>
    <div>
      <gqg-radio-group v-model="radio">
        <gqg-radio label="boy" name="sex">男</gqg-radio>
        <gqg-radio label="girl" name="sex">女</gqg-radio>
        <gqg-radio label="mimi" name="sex">秘密</gqg-radio>
      </gqg-radio-group>
       <gqg-radio-group v-model="radio1">
        <gqg-radio label="18" name="age">18</gqg-radio>
        <gqg-radio label="19" name="age">19</gqg-radio>
        <gqg-radio label="20" name="age">20</gqg-radio>
      </gqg-radio-group>
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
import gqgRadioGroup from "@/components/gqg_radio_group/gqg_radio_group.vue";
export default {
  data() {
    return {
      form: {
        userName: "",
        email: "",
      },
      rules: {
        userName: [{ required: true, message: "不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
      },
      radio: "boy",
      radio1:''
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
    gqgRadioGroup,
  },
  created() {},
  methods: {
    getChange(){
      console.log('2222222')
    },
    getVal(val){
      console.log('------',val)
    }
  },
};
</script>
