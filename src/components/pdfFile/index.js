import gqgPdfFile from "./gqg_pdf.vue";

/* istanbul ignore next */
gqgPdfFile.install = function(Vue) {
  Vue.component(gqgPdfFile.name, gqgPdfFile);
};

export default gqgPdfFile;