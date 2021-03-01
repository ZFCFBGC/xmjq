import gqgRadio from "./gqg_radio.vue";

/* istanbul ignore next */
gqgRadio.install = function(Vue) {
  Vue.component(gqgRadio.name, gqgRadio);
};

export default gqgRadio;