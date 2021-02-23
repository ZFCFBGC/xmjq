import MessageBoxComponent from "./messageBox.vue";
import Vue from "vue";

var instance;

const messageConstructor = Vue.extend(MessageBoxComponent);

instance = new messageConstructor({
  el: document.createElement("div"),
});

const messageBox = (options) => {
  instance.show = true;
  if (options) {
    if (options.el) {
      options.el.appendChild(instance.$el);
    } else {
      document.body.appendChild(instance.$el);
    }
    if (options.title) {
      instance.title = options.title;
    }
    if (options.content) {
      instance.content = options.content;
    }
    if (options.confirmTxt) {
      instance.confirmTxt = options.confirmTxt;
    }
    if (options.cancelTxt) {
      instance.cancelTxt = options.cancelTxt;
    }
  }
  instance.confirmClick = function() {
    instance.show = false;
    if (typeof options.success == "function") {
      options.success(true);
    }
    if (typeof options.complete == "function") {
      options.complete(true);
    }
  };
  instance.cancelClick = function() {
    instance.show = false;
    if (typeof options.success == "function") {
      options.success(false);
    }
    if (typeof options.complete == "function") {
      options.complete(false);
    }
  };
};

export default {
  install() {
    if (!Vue.$messageBox) {
      Vue.$messageBox = messageBox;
    }
    Vue.mixin({
      created() {
        this.$gqgMessageBox = Vue.$messageBox;
      },
    });
  },
};
