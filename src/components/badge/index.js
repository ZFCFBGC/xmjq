import gqgBadge from './badge';

/* istanbul ignore next */
gqgBadge.install = function(Vue) {
  Vue.component(gqgBadge.name, gqgBadge);
};

export default gqgBadge;