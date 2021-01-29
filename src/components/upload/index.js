import gqgUpload from './upload.vue';

/* istanbul ignore next */
gqgUpload.install = function(Vue) {
  Vue.component(gqgUpload.name, gqgUpload);
};

export default gqgUpload;