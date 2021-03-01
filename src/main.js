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

//iconfont矢量库
import "@/assets/iconfont/iconfont.css";

//组件
import "@/components/index.js";

new Vue({
  router,
  render: (h) => h(App),
  beforeCreate() {
    window.Tools = Tools;
  },
}).$mount("#app");
