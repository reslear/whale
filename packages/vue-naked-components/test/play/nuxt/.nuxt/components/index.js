export { default as MiniCarousel } from '../../../../../src/components/MiniCarousel.vue'

export const LazyMiniCarousel = import('../../../../../src/components/MiniCarousel.vue' /* webpackChunkName: "components/mini-carousel" */).then(c => c.default || c)
