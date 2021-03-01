import gqgCarousel from './carousel.vue';

/* istanbul ignore next */
gqgCarousel.install = function(Vue) {
  Vue.component(gqgCarousel.name, gqgCarousel);
};

export default gqgCarousel;