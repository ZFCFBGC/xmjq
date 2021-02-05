import LoadingComponent from "./loading.vue";
import Vue from "vue";

var instance;

const LoadingConstructor = Vue.extend(LoadingComponent);

instance = new LoadingConstructor({
  el: document.createElement("div"),
});

instance.show = false;

const loading = {
  show(options = {}) {
    instance.show = true;
    if (options) {
      if (options.el) {
        options.el.appendChild(instance.$el);
      } else {
        document.body.appendChild(instance.$el);
      }
      instance.text = options.text;
    }
  },
  hide() {
    instance.show = false;
  },
};
export default {
  install() {
    if (!Vue.$loading) {
      Vue.$loading = loading;
    }
    Vue.mixin({
      created() {
        this.$gqgLoading = Vue.$loading;
      },
    });
  },
};
