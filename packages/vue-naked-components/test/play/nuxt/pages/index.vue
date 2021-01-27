<template>
  <div class="container">
    <h1># MiniCarousel</h1>

    <div class="max-w-sm mx-auto">
      <MiniCarousel>
        <template #area="{click, baseClass, isLeft}">
          <div
            :class="[
              baseClass,
              'w-12 from-white',
              isLeft ? 'bg-gradient-to-r' : 'bg-gradient-to-l'
            ]"
          ></div>
          <button
            :class="[
              baseClass,
              isLeft ? 'hover:-translate-x-1' : 'hover:translate-x-1'
            ]"
            class="px-1 text-black transition transform focus:outline-none focus:ring-0 focus:text-black"
            @click="click(isLeft ? -100 : +100)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 9"
              width="14"
              height="9"
              class="transform text-black"
              :class="isLeft ? 'rotate-90' : '-rotate-90'"
            >
              <defs />
              <path
                fill="currentColor"
                d="M12.5.5l1 1L7 8.1.5 1.5l1-1L7 5.9 12.5.5z"
              />
            </svg>
          </button>
        </template>

        <div class="inline-flex space-x-4 no-scrollbar">
          <div class="" :key="index" v-for="(menuItem, index) in menu">
            <a
              class="flex items-center h-16 text-base font-medium transition whitespace-nowrap text-black text-opacity-60"
              href
              :class="{
                'text-opacity-100 border-b border-black':
                  index === activeSectionIndex
              }"
              @click.prevent="activeSectionIndex = index"
              ><span v-html="menuItem.title"></span
            ></a>
          </div>
        </div>
      </MiniCarousel>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
export default Vue.extend({
  components: {},
  props: {},
  data: () => ({
    menu: Array(15).fill({ title: "Link" }),
    activeSectionIndex: 0
  }),
  methods: {}
});
</script>

<style lang="scss" scoped></style>
