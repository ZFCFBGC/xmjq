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
        <gqg-form-item label="性别：" prop="sex">
          <gqg-radio-group v-model="form.sex">
            <gqg-radio label="boy" name="sex">男</gqg-radio>
            <gqg-radio label="girl" name="sex">女</gqg-radio>
            <gqg-radio label="mimi" name="sex">秘密</gqg-radio>
          </gqg-radio-group>
        </gqg-form-item>
      </gqg-form>
    </div>
    <div>
      <gqg-checkbox
        label="复选框DDD"
        v-model="checked"
        @change="getChange"
      ></gqg-checkbox>
    </div>
    <div>
      <gqg-checkbox-group v-model="checkList" @change="getVal">
        <gqg-checkbox label="复选框 A"></gqg-checkbox>
        <gqg-checkbox label="复选框 B"></gqg-checkbox>
        <gqg-checkbox label="复选框 C"></gqg-checkbox>
        <gqg-checkbox label="复选框 D"></gqg-checkbox>
        <gqg-checkbox label="复选框 F"></gqg-checkbox>
      </gqg-checkbox-group>
    </div>
    <div>
      <input
        type="checkbox"
        v-model="toggle"
        :true-value="a"
        :false-value="b"
      />
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
import gqgCheckboxGroup from "@/components/gqg_checkBox_group/gqg_checkBox_group.vue";
export default {
  data() {
    return {
      form: {
        userName: "",
        email: "",
        sex: "",
      },
      rules: {
        userName: [{ required: true, message: "不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "不能为空", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        sex: [
          {
            required: true,
            message: "不能为空",
            trigger: "change",
          },
        ],
      },
      radio: "boy",
      radio1: "",
      checked: true,
      checkList: ["复选框 A", "复选框 C", "复选框 D"],
      classA: "s1",
      classB: "s2",
      a: "a",
      b: "b",
      toggle: 'a',
      activeColor: "#f0f",
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
    gqgCheckboxGroup,
  },
  created() {},
  methods: {
    getChange(val) {
      console.log("2222222", val);
    },
    getVal(val) {
      console.log("------", val);
    },
  },
};
</script>
