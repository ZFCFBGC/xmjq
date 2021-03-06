import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import '@/assets/css/reset.css';
import '@/assets/css/pelling.less';

// 拖拽函数
import drag from "@/assets/js/drag.js";

import { Button, Table, TableColumn, Pagination } from "element-ui";
Vue.config.productionTip = false;
Vue.use(Button);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);

new Vue({
  router,
  render: (h) => h(App),
  beforeCreate() {
  },
}).$mount("#app");
