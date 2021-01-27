import type { NuxtConfig } from "@nuxt/types";

export default <NuxtConfig>{
  components: true,
  buildModules: ["@nuxt/typescript-build", '@nuxtjs/tailwindcss', "../../../src/index"]
};
