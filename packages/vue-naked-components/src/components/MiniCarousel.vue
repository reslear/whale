<template>
  <div class="relative">
    <transition name="fade">
      <div v-show="shadow.left">
        <slot
          name="area"
          :click="scrollTo"
          base-class="absolute inset-0 right-auto"
          :isLeft="true"
          :isRight="false"
        >
        </slot>
      </div>
    </transition>

    <div class="flex overflow-x-auto no-scrollbar" ref="scroll">
      <slot></slot>
    </div>

    <transition name="fade">
      <div v-show="shadow.right">
        <slot
          name="area"
          :click="scrollTo"
          base-class="absolute inset-0 left-auto"
          :isLeft="false"
          :isRight="true"
        >
        </slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  inheritAttrs: false,
  props: {
    leftClass: {
      type: String,
      default: ""
    },
    rightClass: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      shadow: {
        left: false,
        right: false
      }
    };
  },
  computed: {
    el() {
      return this.$refs.scroll as HTMLElement;
    }
  },
  methods: {
    scrollTo(distance: number) {
      if (this.el) {
        this.el.scrollTo({
          left: this.el.scrollLeft + distance,
          behavior: "smooth"
        });
      }
    },
    calcShadow(el: HTMLElement) {
      const pos = el.scrollLeft;
      const dist = 5;

      const isLeft = pos <= dist;
      const isRight = pos >= el.scrollWidth - el.clientWidth - dist;

      let result = {
        left: !isLeft,
        right: !isRight
      };

      this.shadow = result;
    },
    onScroll(e: Event) {
      window.requestAnimationFrame(() => {
        let target = e.target as HTMLElement;
        this.calcShadow(target);
      });
    },

    onResize(e: Event) {
      window.requestAnimationFrame(() => {
        this.calcShadow(this.el);
      });
    }
  },

  mounted() {
    if (this.el) {
      this.calcShadow(this.el);
      this.el.addEventListener("scroll", this.onScroll);
    }
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    if (this.el) {
      this.el.removeEventListener("scroll", this.onScroll);
    }
    window.removeEventListener("resize", this.onResize);
  }
});
</script>

<style lang="postcss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
