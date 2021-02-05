import MessageComponent from "./message.vue";
import Vue from "vue";

var instance;
var timer;

const messageConstructor = Vue.extend(MessageComponent);

instance = new messageConstructor({
  el: document.createElement("div"),
});

instance.show = false;

const message = {
  show(options = {}) {
    instance.show = true;
    if (options) {
      if (options.el) {
        options.el.appendChild(instance.$el);
      } else {
        document.body.appendChild(instance.$el);
      }
      instance.message = options.message || "";
      instance.type = options.type || "";
      instance.showClose = options.showClose || false;
      instance.plain = options.plain || false;
      instance.center = options.center || false;
      var duration = options.duration || 30000;
      timer = setTimeout(function() {
        instance.show = false;
      }, duration);
    }
  },
  hide() {
    instance.show = false;
  },
};
export default {
  install() {
    if (!Vue.$message) {
      Vue.$message = message;
    }
    Vue.mixin({
      created() {
        this.$gqgMessage = Vue.$message;
      },
    });
  },
};
