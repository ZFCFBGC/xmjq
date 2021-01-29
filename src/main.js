import Vue from "vue";
import App from "./App.vue";
import router from "./router";

//请求封装函数
import client from "@/assets/js/client.js";
Vue.prototype.$client = client;

//工具类函数
import Tools from "@/assets/js/tools.js";

/* 初始化CSS, 公共类样式*/
import "@/assets/css/reset.css";
import "@/assets/css/reset.less";

import gqgButton from "@/components/button/index.js";
import gqgSwitch from "@/components/switch/index.js";
import gqgSlider from "@/components/slider/index.js";
import gqgBadge from "@/components/badge/index.js";
import gqgInputNumber from "@/components/inputNumber/index.js";
import gqgUpload from "@/components/upload/index.js";
Vue.use(gqgButton);
Vue.use(gqgSwitch);
Vue.use(gqgSlider);
Vue.use(gqgBadge);
Vue.use(gqgInputNumber);
Vue.use(gqgUpload);
new Vue({
  router,
  render: (h) => h(App),
  beforeCreate() {
    window.Tools = Tools;
  },
}).$mount("#app");
