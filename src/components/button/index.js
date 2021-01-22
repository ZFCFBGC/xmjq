import gqgButton from './button.vue';

/* istanbul ignore next */
gqgButton.install = function(Vue) {
  Vue.component(gqgButton.name, gqgButton);
};

export default gqgButton;