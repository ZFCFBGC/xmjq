import gqgForm from "./gqg_form.vue";

/* istanbul ignore next */
gqgForm.install = function(Vue) {
  Vue.component(gqgForm.name, gqgForm);
};

export default gqgForm;