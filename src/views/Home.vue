<template>
  <div class="home">
    <gqg-button disabled>默认按钮</gqg-button>
    <gqg-button type="warning">警告按钮</gqg-button>
    <gqg-button type="error">错误按钮</gqg-button>
    <gqg-button type="success">成功按钮</gqg-button>
    <gqg-button type="primary" @click="clickBtn(111111)">主要按钮</gqg-button>
    <gqg-button type="primary" round>圆角按钮</gqg-button>
    <div>
      <gqg-switch v-model="swicthVal" @change="getSwitchVal"></gqg-switch>
    </div>
    <div style="width:500px;margin-left:100px;margin-top:20px;">
      <gqg-slider></gqg-slider>
    </div>
    <div style="margin-top:100px;">
      <gqg-badge :value="10" type="success" :max="9">
        <gqg-button type="warning">警告按钮1</gqg-button>
      </gqg-badge>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swicthVal: true,
    };
  },

  created() {},
  methods: {
    getSwitchVal(val) {
      console.log("22222", val);
      console.log("33333", this.swicthVal);
    },
    clickBtn(info) {
      console.log("---------", info);
    },
    val() {
      console.log("222222");
    },
    sliderVal(min, max, total) {},
  },
};
</script>
