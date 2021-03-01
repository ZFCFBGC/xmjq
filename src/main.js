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

import gqgButton from "@/components/button/index.js";
import gqgSwitch from "@/components/switch/index.js";
import gqgSlider from "@/components/slider/index.js";
import gqgBadge from "@/components/badge/index.js";
import gqgInputNumber from "@/components/inputNumber/index.js";
import gqgUpload from "@/components/upload/index.js";
import gqgLoading from "@/components/loading/index.js";
import gqgMessage from "@/components/message/index.js";
import gqgMessageBox from "@/components/messageBox/index.js";
import gqgPopConfirm from "@/components/popConfirm/index.js";
import gqgCarousel from "@/components/carousel/index.js";
import gqgCarouselItem from "@/components/carousel-item/index.js";

Vue.use(gqgButton);
Vue.use(gqgSwitch);
Vue.use(gqgSlider);
Vue.use(gqgBadge);
Vue.use(gqgInputNumber);
Vue.use(gqgUpload);
Vue.use(gqgLoading);
Vue.use(gqgMessage);
Vue.use(gqgMessageBox);
Vue.use(gqgPopConfirm);
Vue.use(gqgCarousel);
Vue.use(gqgCarouselItem);

new Vue({
  router,
  render: (h) => h(App),
  beforeCreate() {
    window.Tools = Tools;
  },
}).$mount("#app");
