import gqgSlider from "./slider.vue";

/* istanbul ignore next */
gqgSlider.install = function(Vue) {
  Vue.component(gqgSlider.name, gqgSlider);
};

export default gqgSlider;
