import gqgCarouselItem from '../carousel/item.vue';

/* istanbul ignore next */
gqgCarouselItem.install = function(Vue) {
  Vue.component(gqgCarouselItem.name, gqgCarouselItem);
};

export default gqgCarouselItem;