import { Module } from "@nuxt/types";
import { resolve } from "path";

const nuxtModule: Module = function() {
  const nuxt = this.nuxt;
  const isComponents = !!nuxt.options.components;

  if (!isComponents) {
    throw new Error(
      "please set `components: true` inside `nuxt.config` and ensure using `nuxt >= 2.13.0`"
    );
  }

  if (isComponents) {
    nuxt.hook("components:dirs", (dirs: any) => {
      dirs.push({ path: resolve(__dirname, "components"), prefix: "" });
    });
  }
};
(nuxtModule as any).meta = {
  name: "vue-naked-components"
};

export default nuxtModule;
